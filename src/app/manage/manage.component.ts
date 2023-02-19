import { Component, OnInit } from '@angular/core';
import { FormLayout, FormLayout as UserFormLayout } from '../model/form-layout-enum';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  FormLayout = UserFormLayout;

  userFormLayout?: FormLayout;

  ngOnInit(): void {
    
  }


}
