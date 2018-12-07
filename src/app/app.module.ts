import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { AngularTokenModule } from 'angular-token';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';

import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { NgPipesModule } from 'ngx-pipes';
import { MasterComponent } from './core/master/master.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Erro404Component } from './layout/erro404/erro404.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MasterComponent,
    Erro404Component,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SnotifyModule,
    NgPipesModule,
    AngularTokenModule.forRoot({
      apiBase: environment.apiURL
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AngularTokenModule,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
