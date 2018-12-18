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
    public evento: any = {};
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
            this.carregando = true;
            const evento = await this.api.postRequest("/eventos/", {
                evento: this.evento
            });

            this.listaEventos.push(evento);
            this.evento = {};
            this.util.notificacao("Evento salvo com sucesso!");
        }catch(e) {
            this.util.notificacao(null, "error");
        }finally {
            this.carregando = false;
        }
    }

    toggleModal() {
        this.modal = !this.modal;
    }
}