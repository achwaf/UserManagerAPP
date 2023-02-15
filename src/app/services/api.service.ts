import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IModel } from '../model/i-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // Define API
  apiURL = 'http://localhost:8080/assessment';

  constructor(private http: HttpClient) {}


  registerUser(userForm:IModel){
    let userToRegister:{
      username:string
      password?:String
      avatar?:Number
    };
    (userToRegister= userForm);
    return this.http.post<string>(`${this.apiURL}/register`,userToRegister).pipe(retry(1), catchError(this.handleError));
  }

  async takeExampleofthis(username:string){
    let usernameBase64 = this.b64EncodeUnicode(username)
    return await firstValueFrom(this.http.get<boolean>(`${this.apiURL}/form/check?username=${usernameBase64}`).pipe(retry(1), catchError(this.handleError)));
  }

  checkIfUserameIsUsed(username:string){
    let usernameBase64 = this.b64EncodeUnicode(username)
    return this.http.get<boolean>(`${this.apiURL}/form/check?username=${usernameBase64}`).pipe(retry(1), catchError(this.handleError));
  }

  /**
   * handle error
   * @param error result in error
   * @returns 
   */
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


  private b64EncodeUnicode(str:string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}

}
