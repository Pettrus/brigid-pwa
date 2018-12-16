import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { LoginActivate } from './services/login-activate';
import { AuthGuardService } from './services/auth-guard.service';
import { Erro404Component } from './layout/erro404/erro404.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [ LoginActivate ] },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuardService ] },
  { path: 'eventos', component: EventosComponent, canActivate: [ AuthGuardService ] },

  { path: '404', component: Erro404Component },

  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  providers: [
    LoginActivate,
    AuthGuardService
  ]
})
export class AppRoutingModule {}