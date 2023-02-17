import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IModel } from '../model/i-model';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { UserAction } from '../model/user-action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('refreshbutton') refreshButton?: ElementRef<HTMLElement>;

  refresh=faRotateRight;
  userList!:IModel[];

  private iconSpinning = [
    { transform: 'rotate(0)' },
    { transform: 'rotate(360deg)' }
  ];
  
  private iconTiming = {
    duration:250,
    iterations: 1,
  }
  

  constructor(private apiService:ApiService, private router:Router){
  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  createHandler(){
    // redirect to manage
    const param={
      action:UserAction.CREATE_USER
    }
    this.router.navigate(['/manage'],{state:{param}})
  }

  refreshHandler(){
    if(!!this.refreshButton){
      this.refreshButton.nativeElement.animate(this.iconSpinning, this.iconTiming);
    }
    this.refreshUsers();
  }

  private refreshUsers(){
    // refresh the users in the list
    this.apiService.getListUsers().subscribe((users: IModel[]) => {
      this.userList = users;
    });
    // refresh the user in topBar which is listening to user change
    this.apiService.refreshUser();
  }

  deleteUserHandler(user:IModel){
    this.userList = this.userList.filter(u => u.username != user.username);
  }

}
