import { Component } from '@angular/core';
import { QuotePosition as QuoteEnum } from 'src/app/model/quote-position';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  QuotePosition = QuoteEnum;
}
