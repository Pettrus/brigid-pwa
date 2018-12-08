import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private router: Router, private snotifyService: SnotifyService) { }

  redirectiona(caminho: string): void {
    this.router.navigate([caminho]);
  }

  notificacao(mensagem?: string, tipo?: string): void {
    const config = {
      timeout: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      position: 'rightTop'
    };

    if(tipo == 'info') {
      this.snotifyService.info(mensagem, config);
    }else if(tipo == 'warning') {
      this.snotifyService.warning(mensagem, config);
    }else if(tipo == 'error') {
      this.snotifyService.error((mensagem == null ? "Algo não ocorreu como o esperado, tente novamente mais tarde." : mensagem), config);
    }else {
      this.snotifyService.success(mensagem, config);
    }
  }

  converterHoras(horas: number): string {
    if(horas == null) return null;
    if(horas < 0) horas = horas * -1;
    const minutosTotal = horas * 60;
    const minutos = minutosTotal % 60;

    return parseInt(horas.toString()) + "H " + parseInt(minutos.toString()) + "M";
  }
}
