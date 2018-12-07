import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Globals } from '../../services/globals';
import { UtilService } from '../../services/util.service';
import { MasterComponent } from '../../core/master/master.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends MasterComponent implements OnInit {
    public horas: any = {};
    public historico: any = [];

    public modalAtivo: boolean = false;

    constructor(private api: ApiService, private util: UtilService, private globals: Globals) {
        super()
    }

    async ngOnInit() {
        try {
            this.carregandoPagina = true;
            [this.horas, this.historico] = await Promise.all([
                this.api.getRequest("/jornada-trabalho/horas-extras"),
                this.api.getRequest("/jornada-trabalho/historico")
            ]);
        }catch(e) {
            console.log(e);
            this.util.notificacao("Algo não foi como o esperado, tente novamente.", "error");
        }finally {
            this.carregandoPagina = false;
        }
    }

    toggleModal() {
        this.modalAtivo = !this.modalAtivo;
    }

    async registrarPonto() {
        try {
            this.carregando = true;
            console.log(this.globals.online);
            if(this.globals.online) {
                const jornada = await this.api.postRequest("/jornada-trabalho/registrar-ponto", {});

                if(this.historico.some(item => item.id.includes(jornada.id))) {
                    const i = this.historico.findIndex(el => el.id == jornada.id);
                    this.historico[i] = jornada;
                    this.horas.horas_extras = this.horas.horas_extras + jornada.horas;
                }else {
                    this.historico.push(jornada);
                }
            }else {
                this.registrarPontoOffline();
            }

            this.toggleModal();
        }catch(e) {
            console.log(e);
            this.util.notificacao("Algo não ocorreu como o esperado, tente novamente.", "error");
        }finally {
            this.carregando = false;
        }
    }

    private registrarPontoOffline() {
        const i = this.historico.findIndex(el => el.fim == null);
        let ponto = null;

        if(i == -1) {
            ponto = {};
            ponto.competencia = new Date().toISOString();
            ponto.inicio = new Date().toISOString();
            this.historico.push(ponto);
        }else {
            this.historico[i].fim = new Date().toISOString();
            ponto = this.historico[i];
        }

        let listaPontos = JSON.parse(localStorage.getItem("pontos"));

        if(listaPontos == null) {
            listaPontos = [];
        }

        listaPontos.push(ponto);
        localStorage.setItem("pontos", JSON.stringify(listaPontos));
    }
}