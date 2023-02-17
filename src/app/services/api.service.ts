import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { IModel } from '../model/i-model';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage.service';
import { UserAction } from '../model/user-action';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define API
  private apiURL = 'http://localhost:8080/assessment';

  constructor(private http: HttpClient, private toastr: ToastrService, private localStorageService: LocalStorageService) { }


  registerUser(userForm: IModel) {
    let userToRegister: {
      username: string
      password?: String
      avatar?: Number
    };
    (userToRegister = userForm);
    return this.http.post<boolean>(`${this.apiURL}/register`, userToRegister).pipe(catchError(this.errorHandler('Error regsitering user')));
  }

  checkIfUserameIsUsed(username: string) {
    let usernameBase64 = this.b64EncodeUnicode(username)
    return this.http.get<boolean>(`${this.apiURL}/form/check?username=${usernameBase64}`).pipe(catchError(this.errorHandler('Error in call for checking username')));
  }

  loginUser(userForm: IModel, appId: string) {
    let loginDetails: {
      username: string
      password?: string
      avatar: Number
    };
    (loginDetails = userForm);
    return this.http.post<IModel>(`${this.apiURL}/login?appId=${appId}`, loginDetails).pipe(catchError(this.errorHandler('Error logging user in')));
  }

  getListUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': this.localStorageService.accessToken!,
        'session-id': this.localStorageService.sessionID!
      })
    };
    return this.http.get<IModel[]>(`${this.apiURL}/auth/users`, httpOptions).pipe(catchError(this.errorHandler('Error getting users')));
  }

  refreshUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': this.localStorageService.accessToken!,
        'session-id': this.localStorageService.sessionID!
      })
    };
    this.http.get<IModel>(`${this.apiURL}/auth/user`, httpOptions)
      .pipe(catchError(this.errorHandler('Error refreshing your user')))
      .subscribe((user: IModel) => {
        this.localStorageService.saveUser(user);
      });
  }

  performAction(action: UserAction, actionDetails?: IModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': this.localStorageService.accessToken!,
        'session-id': this.localStorageService.sessionID!
      })
    };
    const body = {
      action: UserAction[action],
      actionDetails: {
        username: actionDetails?.username,
        password: actionDetails?.password,
        passwordShouldBeChanged: actionDetails?.passwordShouldBeChanged,
        avatar: actionDetails?.avatar
      }
    }
    return this.http.post<string>(`${this.apiURL}/auth/manage`, body, httpOptions).pipe(catchError(this.errorHandler('Error performing action')));
  }

  async isLoggedIn() {
    if (this.localStorageService.isLoggedIn()) {
      return true;
    } else if (this.localStorageService.readFromLocalStorage()) {
      // read from local storage
      const retrievedSession = {
        'access-token': this.localStorageService.accessToken!,
        'session-id': this.localStorageService.sessionID!
      }
      // call api to get the user
      const httpOptions = {
        headers: new HttpHeaders(retrievedSession)
      };
      try {
        const user = await firstValueFrom(this.http.get<IModel>(`${this.apiURL}/auth/user`, httpOptions)
          .pipe(timeout({ first: 2_000 }))); // we wait for the response with a timeout of 2 seconds
        // set the token because the api does not return it
        user.token = retrievedSession['access-token'];
        this.localStorageService.saveLoginDetails(user, retrievedSession['session-id']);
        return true;
      } catch (e) {
        // either it's too late because of the timeout or there is an error getting the user
        // we consider there is no user logged in
        return false
      }
    } else {
      // no session found
      return false;
    }
  }

  /**
   * handle error
   * @param error result in error
   * @returns 
   */
  errorHandler(errorMessage: string) {
    return (err: any) => {
      this.toastr.error(err.error?.details || errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }
  }

  private b64EncodeUnicode(str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16))
    }))
  }

}
