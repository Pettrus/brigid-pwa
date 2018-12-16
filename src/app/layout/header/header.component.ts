import { Component } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private util: UtilService, private api: ApiService) { }

  protected menu: boolean = false;

  toggleMenu() {
    this.menu = !this.menu;
  }

  isMenu() {
    return this.menu;
  }

  async sair() {
    try {
      await this.api.sair();

      this.util.redirectiona("/login");
    }catch(e) {
      console.log(e);
      this.util.notificacao("Não foi possível deslogar", "error");
    }
  }
  
}
