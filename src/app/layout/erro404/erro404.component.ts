import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro404',
  templateUrl: './erro404.component.html',
  styleUrls: ['./erro404.component.css']
})
export class Erro404Component {

  constructor(private router: Router) {}

  home() {
    this.router.navigate(['']);
  }
}
