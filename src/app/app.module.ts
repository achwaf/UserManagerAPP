import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage/manage.component';
import { LoginComponent } from './login/login.component';
import { TalkingAvatarComponent } from './common/talking-avatar/talking-avatar.component';
import { TopBarComponent } from './common/top-bar/top-bar.component';
import { UserFormComponent } from './common/user-form/user-form.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserPanelComponent } from './common/user-panel/user-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouteReuseStrategy } from '@angular/router';
import { AppRouteReuseStrategy } from './utils/app-route-reuse-strategy';

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
    UserPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MdbFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
