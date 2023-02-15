import { Component, ElementRef, ViewChild } from '@angular/core';
import { IModel } from '../model/i-model';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild('refreshbutton') refreshButton?: ElementRef<HTMLElement>;

  refresh=faRotateRight;
  userList!:IModel[];

  private newspaperSpinning = [
    { transform: 'rotate(0)' },
    { transform: 'rotate(360deg)' }
  ];
  
  private newspaperTiming = {
    duration:300,
    iterations: 1,
  }
  

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
    if(!!this.refreshButton){
      this.refreshButton.nativeElement.animate(this.newspaperSpinning, this.newspaperTiming);
    }
  }

}
