import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IModel } from '../model/i-model';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

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
  

  constructor(private apiService:ApiService, private router:Router){
  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  createHandler(){
    // redirect to manage with create action
    this.router.navigate(['/manage'])
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

  deleteUserHandler(user:IModel){
    this.userList = this.userList.filter(u => u.username != user.username);
  }

}
