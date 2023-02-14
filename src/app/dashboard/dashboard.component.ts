import { Component } from '@angular/core';
import { QuotePosition as QuoteEnum } from '../model/quote-position';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  QuotePosition = QuoteEnum;
}
