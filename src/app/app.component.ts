import { Component } from '@angular/core';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ApiService } from './services/api.service';
import { UtilService } from './services/util.service';
import { Globals } from './services/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    Globals
  ]
})
export class AppComponent {

  constructor(private api: ApiService, private global: Globals, private util: UtilService) {
    merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    ).subscribe(on => {
      this.global.online = on;

      if(on) {
        let pontos = JSON.parse(localStorage.getItem("pontos"));

        if(pontos != null) {
          for(let p of pontos) {
            this.api.postRequest("/jornada-trabalho/sincronizar", {
              jornada: p
            });
          }

          localStorage.setItem("pontos", null);
        }
      }
    });
  }
}
