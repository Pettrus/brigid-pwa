import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AngularTokenService } from 'angular-token';
import { LoginActivate } from './services/login-activate';
import { Erro404Component } from './layout/erro404/erro404.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [ LoginActivate ] },
  { path: 'home', component: HomeComponent, canActivate: [ AngularTokenService ] },
  { path: 'home', component: HomeComponent, canActivate: [ AngularTokenService ] },

  { path: '404', component: Erro404Component },

  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  providers: [
    LoginActivate
  ]
})
export class AppRoutingModule {}