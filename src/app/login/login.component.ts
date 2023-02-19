import { Component } from '@angular/core';
import { FormLayout } from '../model/form-layout-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  UserFormLayout=FormLayout

}
