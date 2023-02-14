import { Component, Input } from '@angular/core';
import { QuotePosition } from 'src/app/model/quote-position';

@Component({
  selector: 'app-talking-avatar[position]',
  templateUrl: './talking-avatar.component.html',
  styleUrls: ['./talking-avatar.component.scss']
})
export class TalkingAvatarComponent {

  @Input() position:QuotePosition = QuotePosition.ABOVE;

  isUnder():Boolean{
    return QuotePosition.UNDER === this.position;
  }

  isAbove():Boolean{
    return QuotePosition.ABOVE === this.position;
  }

}
