import { Component, OnInit } from '@angular/core';
import { QuotePosition as QuoteEnum } from 'src/app/model/quote-position';
import { UserModel } from 'src/app/model/user-model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit{
  QuotePosition = QuoteEnum;

  user?:UserModel;

  constructor(private localStorageService:LocalStorageService){
    this.localStorageService.loggedInEvent.subscribe(
      loggedInUser => {
        this.user = loggedInUser;
      });
  }
  ngOnInit(): void {
    this.user = this.localStorageService.loggedInUser;
  }

  


}
