import { Component } from '@angular/core';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Globals } from './services/globals';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    Globals
  ]
})
export class AppComponent {

  private snackB: any = null;

  constructor(private global: Globals, private update: SwUpdate, private snackBar: MatSnackBar) {
    update.available.subscribe(update => {
      const atualizar = snackBar.open("Nova versão do app disponível", "Atualizar");
      atualizar.onAction().subscribe(() => {
        window.location.reload();
      });
    });

    merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    ).subscribe(on => {
      this.global.online = on;

      if(!on) {
        this.snackB = snackBar.open("Você está offline");
      }else if(this.snackB != null) {
        this.snackB.dismiss();
      }
    });
  }
}
