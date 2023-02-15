import { Injectable } from '@angular/core';
import { IModel } from '../model/i-model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser?:IModel;

  constructor(private apiService:ApiService) { }

  

}
