import { EventEmitter, Injectable, Output } from '@angular/core';
import { IModel } from '../model/i-model';
import { UserModel } from '../model/user-model';
import * as shortUUID from 'short-uuid';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _loggedInUser?:UserModel;
  get loggedInUser(){return this._loggedInUser};

  loggedInEvent = new EventEmitter<UserModel>();
  loggedOffEvent = new EventEmitter<string>();

  private _sessionID?:string;
  public get sessionID(){return this._sessionID};
  
  private _accessToken?:string;
  public get accessToken(){return this._accessToken};

  constructor() {
   }

  public saveLoginDetails(loginDetails:IModel, sessionId:string){
    // save user in the service
    this._loggedInUser = new UserModel(loginDetails.username,loginDetails.avatar,!!loginDetails.passwordShouldBeChanged);
    // save accesstoken in the service
    this._accessToken = loginDetails.token;
    // save sessionId in the service
    this._sessionID =  sessionId;

    // save also to local storage to reload the last session in case of refresh page or new tab
    this.saveToLocalStorage();
    // emit event
    this.loggedInEvent.emit(this._loggedInUser);
  }

  public isLoggedIn(){
    if(this._loggedInUser){
      // the user is still here, loegged in
      return true;
    }
    return false;
  }

  public readFromLocalStorage():boolean{
    // get the session in the local storage if it exists
    this._sessionID = localStorage.getItem('sessionID') || undefined;
    this._accessToken = localStorage.getItem('token') || undefined;
    // both values should exist
    return !!this._accessToken && !!this._sessionID;
  }

  public generateSessionID(){
    return shortUUID.generate();
  }

  private clearLocalStorage(){
    localStorage.removeItem('sessionID');
    localStorage.removeItem('token');
  }

  private saveToLocalStorage(){
    localStorage.setItem('sessionID', this._sessionID!);
    localStorage.setItem('token', this._accessToken!);
  }


}
