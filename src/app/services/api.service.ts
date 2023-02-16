import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IModel } from '../model/i-model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define API
  apiURL = 'http://localhost:8080/assessment';

  constructor(private http: HttpClient, private toastr: ToastrService) { }


  registerUser(userForm: IModel) {
    let userToRegister: {
      username: string
      password?: String
      avatar?: Number
    };
    (userToRegister = userForm);
    return this.http.post<boolean>(`${this.apiURL}/register`, userToRegister).pipe(catchError(this.errorHandler()));
  }

  /*async takeExampleofthis(username:string){
    let usernameBase64 = this.b64EncodeUnicode(username)
    return await firstValueFrom(this.http.get<boolean>(`${this.apiURL}/form/check?username=${usernameBase64}`).pipe(catchError(this.handleError)));
  }*/

  checkIfUserameIsUsed(username: string) {
    let usernameBase64 = this.b64EncodeUnicode(username)
    return this.http.get<boolean>(`${this.apiURL}/form/check?username=${usernameBase64}`).pipe(catchError(this.errorHandler()));
  }

  loginUser(userForm:IModel, appId:string){
    let loginDetails: {
      username: string
      password?: string
      avatar: Number
    };
    (loginDetails = userForm);
    return this.http.post<IModel>(`${this.apiURL}/login?appId=${appId}`, loginDetails).pipe(catchError(this.errorHandler()));
  }
  /**
   * handle error
   * @param error result in error
   * @returns 
   */
  errorHandler() {
    let errorMessage = 'API call';
    return (err: any) => {
      this.toastr.error(err.error.details);
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
