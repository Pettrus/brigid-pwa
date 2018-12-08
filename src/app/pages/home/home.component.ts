import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Globals } from '../../services/globals';
import { UtilService } from '../../services/util.service';
import { MasterComponent } from '../../core/master/master.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends MasterComponent implements OnInit, OnDestroy {
    public horas: any = {};
    public historico: any = [];

    public modalAtivo: boolean = false;

    public interval: any = null;

    public tempoTrabalho: string = null;

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

            if(this.historico.some(item => item.fim == null)) {
                const i = this.historico.findIndex(el => el.fim == null);
                this.contarTempo(this.historico[i]);
            }
        }catch(e) {
            console.log(e);
            this.util.notificacao(null, "error");
        }finally {
            this.carregandoPagina = false;
        }
    }

    ngOnDestroy() {
        if(this.interval) {
            clearInterval(this.interval);
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

                    clearInterval(this.interval);
                }else {
                    this.historico.push(jornada);
                }
            }else {
                this.registrarPontoOffline();
            }

            this.toggleModal();
        }catch(e) {
            console.log(e);
            this.util.notificacao(null, "error");
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

            clearInterval(this.interval);
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

    async sair() {
        try {
            await this.api.sair();

            this.util.redirectiona("/login");
        }catch(e) {
            console.log(e);
            this.util.notificacao("Não foi possível deslogar", "error");
        }
    }

    contarTempo(jornada) {
        this.interval = setInterval(() => {
            const inicio = new Date(jornada.inicio).getTime();
            const now = new Date().getTime();
      
            let distance = now - inicio;
            
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
            this.tempoTrabalho = (hours == 0 ? "" : hours + "H ") + minutes + "M " + seconds + "s";
        }, 1000);
    }
}