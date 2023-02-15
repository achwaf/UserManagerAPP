import { Component } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  passwordVisible:boolean=false;
  selectedAvatar:number=0;

  constructor(private animalService:AnimalService){};

  getPasswordType(){
    return this.passwordVisible?'text':'password';
  }

  changeAvatarHandler(){
    this.selectedAvatar= this.animalService.next();
  }

  showHandler(){
    this.passwordVisible=true
  }

  hideHandler(){
    this.passwordVisible=false;
  }

}
