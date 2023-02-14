import { Component, Input } from '@angular/core';
import { QuotePosition } from 'src/app/model/quote-position';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-talking-avatar[position]',
  templateUrl: './talking-avatar.component.html',
  styleUrls: ['./talking-avatar.component.scss']
})
export class TalkingAvatarComponent {

  animalAvatar:String;

  constructor(private animalService:AnimalService) {
    this.animalAvatar = `/assets/animals/${animalService.next()}.png`;
  }

  @Input() position:QuotePosition = QuotePosition.ABOVE;

  isUnder():Boolean{
    return QuotePosition.UNDER === this.position;
  }

  isAbove():Boolean{
    return QuotePosition.ABOVE === this.position;
  }

}
