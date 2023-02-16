import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IModel } from '../model/i-model';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('refreshbutton') refreshButton?: ElementRef<HTMLElement>;

  refresh=faRotateRight;
  userList!:IModel[];

  private newspaperSpinning = [
    { transform: 'rotate(0)' },
    { transform: 'rotate(360deg)' }
  ];
  
  private newspaperTiming = {
    duration:250,
    iterations: 1,
  }
  

  constructor(private apiService:ApiService){
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
  ngOnInit(): void {
    this.refreshUsers();
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
    this.refreshUsers();
  }

  private refreshUsers(){
    this.apiService.getListUsers().subscribe((users: IModel[]) => {
      this.userList = users;
    });
  }

}
