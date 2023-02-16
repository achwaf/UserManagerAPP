import { Component, Input, OnInit } from '@angular/core';
import { QuotePosition } from 'src/app/model/quote-position';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-talking-avatar',
  templateUrl: './talking-avatar.component.html',
  styleUrls: ['./talking-avatar.component.scss']
})
export class TalkingAvatarComponent implements OnInit {

  @Input() position:QuotePosition = QuotePosition.NONE;
  @Input() disabled:boolean=false;
  
  private _animal!:number;
  get animal(){return this._animal}
  @Input() 
  set animal(value:number){
    this._animal = value;
    this.setAnimalImageSrc();
  }

  animalImageSrc!:String;

  constructor(private animalService:AnimalService) {
    
  }
  ngOnInit(): void {
    this.setAnimalImageSrc();
  }

  setAnimalImageSrc(){
    if(!this.animal || this.animal < 1 ||  this.animal > this.animalService.animalsCount){
      // display this specific animal (star) when the animal selected is not valid
      this.animalImageSrc = `/assets/animals/0.png`;
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
