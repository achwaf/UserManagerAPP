import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IModel } from 'src/app/model/i-model';
import { QuotePosition as QuoteEnum } from '../../model/quote-position-enum';
import { UserAction as UserEnum } from '../../model/user-action-enum';
import { faTrashAlt, faPenToSquare, faRectangleXmark, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { InteractEvent } from 'src/app/model/interact-event-enum';
import { InteractService } from 'src/app/services/interact.service';
import { INotifiable } from 'src/app/model/i-notifiable';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  delete = faTrashAlt;
  disable = faRectangleXmark;
  enable = faCheckSquare;
  edit = faPenToSquare;
  QuotePosition = QuoteEnum;
  UserAction = UserEnum;

  @Input() user!: IModel;
  @Output() deleteMeEvent = new EventEmitter<IModel>();

  @ViewChild('talker') avatar!: INotifiable;

  constructor(private apiService: ApiService, private router: Router, private interactService: InteractService, private toastr: ToastrService) { }


  action: UserEnum = UserEnum.INITIAL;
  showConfirm: Boolean = false;

  enableHandler() {
    this.action = UserEnum.ENABLE_USER;
    this.showConfirm = true;
  }

  disableHandler() {
    this.action = UserEnum.DISABLE_USER;
    this.showConfirm = true;
    // poke the avatar
    this.avatar.notify(InteractEvent.DISABLE);
  }

  deleteHandler() {
    this.action = UserEnum.DELETE_USER;
    this.showConfirm = true;

    // poke the avatar
    this.avatar.notify(InteractEvent.DELETE);
  }

  editHandler() {
    this.action = UserEnum.CHANGE_USER_PASS;
    this.showConfirm = false;
    // redirect to manage
    const param = {
      action: this.action,
      user: this.user,
    }
    this.router.navigate(['/manage'], { state: { param } })
  }

  confirmHandler() {
    // call Api to perform action
    this.apiService.performAction(this.action, this.user).subscribe(() => {
      // action performed 
      // apply enable/disable locally
      if (UserEnum.ENABLE_USER === this.action || UserEnum.DISABLE_USER === this.action) {
        this.user.disabled = !this.user.disabled;
        // notify avatar
        if (this.user.disabled) {
          this.avatar.notify(InteractEvent.CONFIRM_DISABLE);
        } else {
          this.avatar.notify(InteractEvent.CONFIRM_ENABLE);
        }

      } else if (UserEnum.DELETE_USER === this.action) {
        //no need to notify the avatar, it will be removed anyway
        // however we should deregister the avatar from interactService
        this.interactService.unregister(this.avatar);
        // send event to delete self from the parent
        this.deleteMeEvent.emit(this.user);
      }
      // clear
      this.action = UserEnum.INITIAL;
      this.showConfirm = false;
    });
  }

  cancelHandler() {
    //clear
    this.action = UserEnum.INITIAL;
    this.showConfirm = false;
    // poke the avatar
    this.avatar.notify(InteractEvent.CANCEL);
  }





}
