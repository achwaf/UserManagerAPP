import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
      username:String
      password?:String
      avatar:Number
    };
    (userToRegister= userForm);
    return this.http.post<String>(`${this.apiURL}/register`,userToRegister).pipe(retry(1), catchError(this.handleError));
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

}
