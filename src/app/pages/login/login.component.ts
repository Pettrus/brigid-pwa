import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { MasterComponent } from '../../core/master/master.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends MasterComponent implements OnInit {

  public usuario: any = {};

  public email: string = null;
  public password: string = null;
  public carregando: boolean = false;

  public form: FormGroup;

  public modal: boolean = false;

  constructor(private api: ApiService, private util: UtilService, private fb: FormBuilder) {super()}

  ngOnInit() {
    this.form = this.fb.group({
      'nome': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      'email': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]],
      'tempo_jornada': ['', [Validators.required]],
    });
  }

  async login() {
    try {
      this.carregando = true;
      await this.api.login(this.email, this.password);
      console.log("Logou");

      this.util.redirectiona("home");
    }catch(e) {
      this.util.notificacao("Usuário ou senha incorretos", "info");
    }finally {
      this.carregando = false;
    }
  }

  async cadastrarUsuario() {
    try {
      if (!this.form.valid) {
        this.form = this._markFormDirty(this.form);
        return;
      }
      
      this.carregando = true;
      const cadastrado = await this.api.postRequest("/usuario/cadastro", {
        usuario: this.usuario
      });

      if(cadastrado == true) {
        this.util.notificacao("Email já cadastrado", "info");
      }else {
        this.util.notificacao("Usuário cadastrado com sucesso!", "success");
        this.toggleModal();
      }
    }catch(e) {
      console.log(e);
      this.util.notificacao("Algo não ocorreu como o esperado, tente novamente.", "error");
    }finally {
      this.carregando = false;
    }
  }

  toggleModal() {
    this.modal = !this.modal;
  }
}
