import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private remainingAnimals!: Array<number>;

  public readonly animalsCount:number=169;

  constructor() {
    this.initAnimals();
  }

  public next():number {
    if (this.remainingAnimals.length === 0) {
      this.initAnimals();
    }
    let randomSelect = Math.floor(Math.random() * (this.remainingAnimals.length));
    let selectedAnimal = this.remainingAnimals[randomSelect];
    this.remainingAnimals.splice(randomSelect, 1);

    return selectedAnimal;
  }

  private initAnimals() {
    this.remainingAnimals = Array.from({ length: this.animalsCount }, (_, index) => index + 1);
  }


}
