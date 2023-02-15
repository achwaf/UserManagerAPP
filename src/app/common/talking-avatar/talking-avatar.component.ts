import { Component, Input, OnInit } from '@angular/core';
import { IUserModel } from 'src/app/model/i-user-model';
import { QuotePosition } from 'src/app/model/quote-position';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-talking-avatar[position]',
  templateUrl: './talking-avatar.component.html',
  styleUrls: ['./talking-avatar.component.scss']
})
export class TalkingAvatarComponent implements OnInit {

  @Input() position:QuotePosition = QuotePosition.ABOVE;
  @Input() animal!:number;

  animalImageSrc!:String;

  constructor(private animalService:AnimalService) {
    
  }
  ngOnInit(): void {
    if(!this.animal || this.animal < 1 ||  this.animal > 30){
      this.animalImageSrc = `/assets/animals/${this.animalService.next()}.png`;
    }else{
      this.animalImageSrc = `/assets/animals/${this.animal}.png`;
    }
  }

  isUnder():Boolean{
    return QuotePosition.UNDER === this.position;
  }

  isAbove():Boolean{
    return QuotePosition.ABOVE === this.position;
  }

}
