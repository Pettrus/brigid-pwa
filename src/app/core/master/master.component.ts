import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html'
})
export class MasterComponent {

  constructor() {}

  protected menu: boolean = false;

  protected carregandoPagina: boolean = false;
  protected carregando: boolean = false;

  isCarregando(): boolean {
    return this.carregando;
  }

  isCarregandoPagina(): boolean {
    return this.carregandoPagina;
  }

  toggleMenu() {
    this.menu = !this.menu;
  }

  isMenu() {
    return this.menu;
  }

  _markFormDirty(form: FormGroup): FormGroup {
    Object.keys(form.controls).forEach(control => {
      form.controls[control].markAsDirty();
    });
    return form;
  }

  _markFormPristine(form: FormGroup): FormGroup {
    Object.keys(form.controls).forEach(control => {
      form.controls[control].markAsPristine();
      form.controls[control].markAsUntouched();
    });
    return form;
  }
}