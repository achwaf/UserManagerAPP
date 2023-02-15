import { Component, Input } from '@angular/core';
import { IUserModel } from 'src/app/model/i-user-model';
import { QuotePosition as QuoteEnum } from '../../model/quote-position';
import { UserAction as UserEnum } from '../../model/user-action';
import { faTrashAlt, faPenToSquare, faRectangleXmark, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

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
  
  @Input() user!:IUserModel;

  
  action:UserEnum= UserEnum.INITIAL;
  showConfirm:Boolean=false;

  enableHandler(){
    this.action = UserEnum.ENABLE;
    this.showConfirm=true;
  }

  disableHandler(){
    this.action = UserEnum.DISABLE;
    this.showConfirm=true;
  }

  deleteHandler(){
    this.action = UserEnum.DELETE;
    this.showConfirm=true;
  }

  editHandler(){
    this.action = UserEnum.EDIT;
    this.showConfirm=false;
  }

  confirmHandler(){
    this.action = UserEnum.INITIAL;
    this.showConfirm=false;
  }

  cancelHandler(){
    this.action = UserEnum.INITIAL;
    this.showConfirm=false;
  }



}
