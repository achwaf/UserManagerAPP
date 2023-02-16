import { Injectable } from '@angular/core';
import { IModel } from '../model/i-model';
import { UserModel } from '../model/user-model';
import { ApiService } from './api.service';
import * as shortUUID from 'short-uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser?:UserModel;
  private _sessionID?:string;
  public get sessionID(){return this._sessionID};
  
  private _accessToken?:string;
  public get accessToken(){return this._accessToken};

  constructor(private apiService:ApiService) { }

  public login(loginDetails:IModel, sessionId:string){
    // save user
    this.loggedInUser = new UserModel(loginDetails.username,loginDetails.avatar,!!loginDetails.passwordShouldBeChanged);
    // save accesstoken
    this._accessToken = loginDetails.token;
    // save sessionId
    this._sessionID =  sessionId;
  }

  public generateSessionID(){
    return shortUUID.generate();
  }




}
