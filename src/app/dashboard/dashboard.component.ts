import { Component } from '@angular/core';
import { IModel } from '../model/i-model';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  refresh=faRotate;
  userList!:IModel[];

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

  refreshHandler(){
    
  }

}
