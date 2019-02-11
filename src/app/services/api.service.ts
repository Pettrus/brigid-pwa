import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularTokenService } from 'angular-token';
import { HttpClient } from '@angular/common/http';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public URLBASE: string = environment.apiURL;

  constructor(private tokenService: AngularTokenService, private http: HttpClient, private snotifyService: SnotifyService) {}

  getRequest(url: string): Promise<any> {
    return this.http.get(this.URLBASE + url).toPromise();
  }

  postRequest(url: string, params: object): Promise<any> {
    return this.http.post(this.URLBASE + url, params).toPromise();
  }

  login(login, password): Promise<any> {
    return this.tokenService.signIn({
      login: login,
      password: password
    }).toPromise();
  }

  sair(): Promise<any> {
    return this.tokenService.signOut().toPromise();
  }
  
  usuarioLogado(): boolean {
    return this.tokenService.userSignedIn();
  }

  tokenValido(): boolean {
    if (localStorage.getItem("expiry") === undefined) return false;
    const date = new Date(0);
    date.setUTCSeconds(+localStorage.getItem("expiry"));
    
    if (date === undefined) return false;
    return date.valueOf() > new Date().valueOf();
  }

  cuidarErro(e): void {
    const config = {
      timeout: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      position: 'rightTop'
    };

    if(e.error instanceof Array) {
      this.snotifyService.error(e.error[0], config);
    }else {
      this.snotifyService.error("Algo não ocorreu como o esperado, tente novamente mais tarde.", config);
    }
  }
}
