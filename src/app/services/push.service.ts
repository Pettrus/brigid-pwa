import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private swPush: SwPush, private api: ApiService) {}

  inscrever() {
    if(this.swPush.isEnabled) {
      this.swPush.requestSubscription({
          serverPublicKey: environment.publicKey
      }).then(pushSubscription => {
          this.salvarInscricao(pushSubscription);
      }).catch(err => {
        console.error(err);
      })
    }
  }

  private async salvarInscricao(pushSubscription) {
    await this.api.postRequest("/usuario/webpush", {
      subscription: pushSubscription
    });
  }
}