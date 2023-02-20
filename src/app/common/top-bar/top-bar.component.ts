import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { faCircleUser, faComment, faHand, faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { INotifiable } from 'src/app/model/i-notifiable';
import { InteractionName } from 'src/app/model/interact-event-enum';
import { QuotePosition as QuoteEnum } from 'src/app/model/quote-position-enum';
import { UserAction } from 'src/app/model/user-action-enum';
import { UserModel } from 'src/app/model/user-model';
import { ApiService } from 'src/app/services/api.service';
import { InteractService } from 'src/app/services/interact.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  QuotePosition = QuoteEnum;
  interact = faComment;
  vote = faNoteSticky;
  control = faHand;
  edit = faCircleUser;
  logout = faArrowRightFromBracket;

  showMenu: boolean = false;
  showInteractions: boolean = true;

  @ViewChild('avatar') avatar!: INotifiable;

  user?: UserModel;

  constructor(private apiService: ApiService, private router: Router, private localStorageService: LocalStorageService, private interactService: InteractService) {
    this.localStorageService.loggedInEvent.subscribe(
      loggedInUser => {
        this.user = loggedInUser;
      });
    this.localStorageService.loggedOffEvent.subscribe(
      loggedInUser => {
        this.user = undefined;
      });
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // show the interactions menu only on the dashboard '/list'
        if ('/manage' == event.url) {
          this.showInteractions = false;
        } else {
          this.showInteractions = true;
        }
      }
    });
  }

  ngOnInit(): void {
    // in case of refresh of the page, the listener in the constructor reacts before OnInit
    // so we take the user from localStorageService if undefined
    if (!this.user) {
      this.user = this.localStorageService.loggedInUser;
    }
  }

  profileHandler() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  editeHandler() {
    this.closeMenu();
    // redirect to edit user
    const param = {
      action: UserAction.CHANGE_OWN_PASS,
      user: this.user,
    }
    this.router.navigate(['/manage'], { state: { param } })
  }

  interactHandler() {
    this.closeMenu();

    // call service for interaction
    this.interactService.guideInteraction(this.avatar, InteractionName.STARTUP);

  }
  voteHandler() {
    this.closeMenu();

    // call service for interaction
    this.interactService.guideInteraction(this.avatar, InteractionName.VOTE);
  }
  controlHandler() {
    this.closeMenu();
  }

  logoutHandler() {
    this.closeMenu();
    // logout 
    this.localStorageService.clearLoginDetails();
    // redirect to login page
    this.router.navigate(['/login']);
  }




}
