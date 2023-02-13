import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage/manage.component';
import { LoginComponent } from './login/login.component';
import { TalkingAvatarComponent } from './common/talking-avatar/talking-avatar.component';
import { TopBarComponent } from './common/top-bar/top-bar.component';
import { UserFormComponent } from './common/user-form/user-form.component';
import { ModalAlertComponent } from './common/modal-alert/modal-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ManageComponent,
    LoginComponent,
    TalkingAvatarComponent,
    TopBarComponent,
    UserFormComponent,
    ModalAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
