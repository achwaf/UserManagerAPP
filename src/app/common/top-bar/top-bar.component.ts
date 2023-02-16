import { Component } from '@angular/core';
import { QuotePosition as QuoteEnum } from 'src/app/model/quote-position';
import { UserModel } from 'src/app/model/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  QuotePosition = QuoteEnum;

  user?:UserModel;

  constructor(private authService:AuthService){
    this.authService.loggedInEvent.subscribe(
      loggedInUser => {
        this.user = loggedInUser;
      });
  }


}
