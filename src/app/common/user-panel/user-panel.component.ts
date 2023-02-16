import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IModel } from 'src/app/model/i-model';
import { QuotePosition as QuoteEnum } from '../../model/quote-position';
import { UserAction as UserEnum } from '../../model/user-action';
import { faTrashAlt, faPenToSquare, faRectangleXmark, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  delete=faTrashAlt;
  disable=faRectangleXmark;
  enable=faCheckSquare;
  edit=faPenToSquare;
  QuotePosition = QuoteEnum;
  UserAction=UserEnum;
  
  @Input() user!:IModel;
  @Output() deleteMeEvent = new EventEmitter<IModel>();

  constructor(private apiService:ApiService, private router: Router, private toastr:ToastrService){}

  
  action:UserEnum= UserEnum.INITIAL;
  showConfirm:Boolean=false;

  enableHandler(){
    this.action = UserEnum.ENABLE_USER;
    this.showConfirm=true;
  }

  disableHandler(){
    this.action = UserEnum.DISABLE_USER;
    this.showConfirm=true;
  }

  deleteHandler(){
    this.action = UserEnum.DELETE_USER;
    this.showConfirm=true;
  }

  editHandler(){
    this.action = UserEnum.CHANGE_USER_PASS;
    this.showConfirm=false;
    // redirect to manage
    this.router.navigate(['/manage'])
  }

  confirmHandler(){
    // call Api to perform action
    this.apiService.performAction(this.action,this.user).subscribe(() => {
      // action performed 
      // apply enable/disable locally
      if(UserEnum.ENABLE_USER === this.action || UserEnum.DISABLE_USER === this.action){
        this.user.disabled =  !this.user.disabled;
      }else if(UserEnum.DELETE_USER === this.action){
        this.deleteMeEvent.emit(this.user);
      }
    });

    // clear
    this.action = UserEnum.INITIAL;
    this.showConfirm=false;
  }

  cancelHandler(){
    //clear
    this.action = UserEnum.INITIAL;
    this.showConfirm=false;
  }



}
