import { Component } from '@angular/core';
import { QuotePosition as QuoteEnum } from '../model/quote-position';
import { UserAction as UserEnum } from '../model/user-action';
import { faTrashAlt, faPenToSquare, faRectangleXmark, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { IUserModel } from '../model/i-user-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  userList!:IUserModel[];

  constructor(){
    this.userList = [{
      username:'suika.habouba@gmail.com',
      avatar: 10,
      disabled: true,
      passwordShouldBeChanged: false
    },
    {
      username:'soukaina.cuta@gmail.com',
      avatar: 5,
      disabled: false,
      passwordShouldBeChanged: false
    }]
  }

  createHandler(){
    this.userList.push({
      username:'soukaina.cuta@gmail.com.soukaina.cuta@gmail.com',
      avatar: 0,
      disabled: false,
      passwordShouldBeChanged: false
    })
  }

}
