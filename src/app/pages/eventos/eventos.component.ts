import { Component, OnInit } from '@angular/core';
import { MasterComponent } from '../../core/master/master.component';
import { UtilService } from '../../services/util.service';
import { ApiService } from 'src/app/services/api.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent extends MasterComponent implements OnInit {

    public listaEventos: any = [];
    public evento: any = {tipo: 1};
    public modal: boolean = false;

    public form: FormGroup;

    constructor(private api: ApiService, private util: UtilService, private fb: FormBuilder) {
        super();
    }

    async ngOnInit() {
        try {
            this.form = this.fb.group({
                'nome': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
                'competencia': ['', [Validators.required]],
                'horas': ['', [Validators.required]],
                'tipo': ['', [Validators.required]],
            });
            this.carregandoPagina = true;
            this.listaEventos = await this.api.getRequest("/eventos");
        }catch(e) {
            this.util.notificacao(null, "error");
        }finally {
            this.carregandoPagina = false;
        }
    }

    async salvar() {
        try {
            if (!this.form.valid) {
                this.form = this._markFormDirty(this.form);
                return;
            }

            this.carregando = true;
            const evento = await this.api.postRequest("/eventos/", {
                evento: this.evento
            });

            this.listaEventos.push(evento);
            this.evento = {};
            this.util.notificacao("Evento salvo com sucesso!");
            this.toggleModal();
        }catch(e) {
            console.log(e);
            this.api.cuidarErro(e);
        }finally {
            this.carregando = false;
        }
    }

    toggleModal() {
        if(!this.modal) {
            this.evento = {tipo: 1};
            this.form = this._markFormPristine(this.form);
        }
        this.modal = !this.modal;
    }
}