import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  remainingAnimals!: Array<number>;


  constructor() {
    this.initAnimals();
  }


  public next():number {
    if (this.remainingAnimals.length === 0) {
      this.initAnimals();
    }
    let randomSelect = Math.floor(Math.random() * (this.remainingAnimals.length-1));
    let selectedAnimal = this.remainingAnimals[randomSelect];
    this.remainingAnimals.splice(randomSelect, 1);

    return selectedAnimal;
  }

  private initAnimals() {
    this.remainingAnimals = Array.from({ length: 30 }, (_, index) => index + 1);
  }


}
