import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IModel } from '../model/i-model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { UserAction } from '../model/user-action';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define API
  private apiURL = 'http://localhost:8080/assessment';

  constructor(private http: HttpClient, private toastr: ToastrService, private authService:AuthService) { }


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

  loginUser(userForm:IModel, appId:string){
    let loginDetails: {
      username: string
      password?: string
      avatar: Number
    };
    (loginDetails = userForm);
    return this.http.post<IModel>(`${this.apiURL}/login?appId=${appId}`, loginDetails).pipe(catchError(this.errorHandler('Error logging user in')));
  }

  getListUsers(){
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token':  this.authService.accessToken!,
        'session-id': this.authService.sessionID!
      })
    };
    return this.http.get<IModel[]>(`${this.apiURL}/auth/users`, httpOptions).pipe(catchError(this.errorHandler('Error getting users')));
  }

  performAction(action:UserAction, actionDetails:IModel){
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token':  this.authService.accessToken!,
        'session-id': this.authService.sessionID!
      })
    };
    const body ={
      action:UserAction[action],
      actionDetails: {
          username: actionDetails.username,
          password: actionDetails.password,
          passwordShouldBeChanged:actionDetails.passwordShouldBeChanged,
          avatar: actionDetails.avatar
      }
    }
    return this.http.post<string>(`${this.apiURL}/auth/manage`,body, httpOptions).pipe(catchError(this.errorHandler('Error performing action')));
  }

  /**
   * handle error
   * @param error result in error
   * @returns 
   */
  errorHandler(errorMessage:string) {
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
