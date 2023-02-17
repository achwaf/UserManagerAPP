import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes =  [
  { path: 'login', component: LoginComponent },
  { path: 'list', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
