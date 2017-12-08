import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ImpressoraPopupService} from "../impressora-popup.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ImpressoraService} from "../impressora.service";
import {ImpressoraData} from "../impressora.data.model";
import {Impressora} from "../impressora.model";
import {JhiEventManager} from "ng-jhipster";

@Component({
    selector: 'jhi-assistente',
    templateUrl: './assistente.component.html',
    styleUrls: ['../../../layouts/tableheader/tableheader.component.scss']
})
export class AssistenteComponent implements OnInit {


    impressoras:ImpressoraData[] = [];
    impressora: ImpressoraData = new ImpressoraData();
    selected: boolean = false;

    data :Data = new Data();

    printer: Impressora;
    ip : string;


    constructor(
        public activeModal: NgbActiveModal,
        private impressoraService: ImpressoraService,
        private eventManager: JhiEventManager
        ) { }

    ngOnInit() {
        this.printer = new Impressora();
    }

    pesquisar(ip) {
        this.ip = ip;
        this.impressoraService.queryPrints(ip).subscribe(
            prints => this.impressoras = prints
        );
    }

    select(impressora) {
        this.impressora = impressora;
        this.selected = true;
    }


    close() {
        this.activeModal.dismiss('cancel');
    }

    sw(){
        console.log(this.data);
    }


    salvar(){
        if (this.impressora && this.selected) {

            this.printer.nome = this.impressora.nome;
            this.printer.prioridade = 0;
            this.printer.codigo = this.ip + '-' + (this.impressora.termica ? 'ecf' : 'imp');

            let local = [];

            if (this.data.producao) {
                local.push(this.data.local);
            }
            if (this.data.relatorio) {
                local.push('relatorio');
            }
            if (this.data.nota) {
                local.push('nota');
            }

            this.printer.local = local.join(',');

            this.impressoraService.create(this.printer)
                .subscribe((printer) => {
                    this.eventManager.broadcast({ name: 'impressoraListModification', content: 'OK'});
                    this.activeModal.close(printer);
                } );

        } else {
            alert('Selecione uma impressora primeiro!');
        }
    }



}

class Data {

    private _producao :boolean;
    private _nota :boolean;
    private _relatorio :boolean;
    private _local :string;

    constructor(){
        this._producao = false;
        this._nota = false;
        this._relatorio = false;
        this._local = '';
    }


    get producao(): boolean {
        return this._producao;
    }

    set producao(value: boolean) {
        this._producao = value;
    }

    get nota(): boolean {
        return this._nota;
    }

    set nota(value: boolean) {
        this._nota = value;
    }

    get relatorio(): boolean {
        return this._relatorio;
    }

    set relatorio(value: boolean) {
        this._relatorio = value;
    }

    get local(): string {
        return this._local;
    }

    set local(value: string) {
        this._local = value;
    }
}


@Component({
    selector: 'jhi-impressora-assistent-popup',
    template: ''
})
export class ImpressoraAssistentePopupComponent implements OnInit {

    routeSub: any;

    constructor(
        private impressoraPopupService: ImpressoraPopupService
    ) {}

    ngOnInit() {
        this.impressoraPopupService
            .open(AssistenteComponent as Component, null);
    }

}

