import {Component, OnDestroy, OnInit} from '@angular/core';
import {Lancamento, Natureza} from "../lancamento.model";
import {Comanda} from "../../comanda/comanda.model";
import {ActivatedRoute} from "@angular/router";
import {LancamentoPopupService} from "../lancamento-popup.service";
import {LancamentoService} from "../lancamento.service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ColaboradorService} from "../../colaborador/colaborador.service";
import { JhiEventManager } from 'ng-jhipster';
import {DecimalPipe} from "@angular/common";

@Component({
    selector: 'jhi-fechar',
    templateUrl: './fechar.component.html',
    styles: [],
    providers: [DecimalPipe]
})
export class FecharComponent implements OnInit {


    lancamento: Lancamento;
    comanda: Comanda;
    desconto = 0.0;
    valorPago = 0.0;

    constructor(
        public activeModal: NgbActiveModal,
        public colaborador: ColaboradorService,
        private eventManager: JhiEventManager,
        private cn: DecimalPipe,
        private lancamentoService: LancamentoService
    ) {
        this.lancamento = new Lancamento();
        this.colaborador.getCurrentColaborador().subscribe(
            (c) => {
                this.lancamento.colaborador = c;
            },
            () =>  this.lancamento.colaborador = undefined
        );
    }

    ngOnInit() {
        if (this.comanda.gorjeta <= 0){
            alert('Atenção não há encargos para esta comanda, imprima a pré-conta antes de fechar!');
        }
        this.valorPago = parseFloat(this.cn.transform(this.comanda.total + this.comanda.gorjeta, '1.2-2').replace(',', '.'));
        this.lancamento.parcelas = 1;
        this.lancamento.natureza = Natureza.A_VISTA_DINHEIRO;
        this.lancamento.vencimento = this.lancamento.data =
            new Date().toISOString().replace(/T.*/, '') + 'T' +
            new Date().toString().replace(/\w+ \w+ \d+ \d+ | \w+.*/g, '');
        this.update();
        this.lancamento.observacao = null;
    }


    isAPrazo() :boolean {
        return this.lancamento ?  this.lancamento.isAPrazo() : false;
    }

    setNat() {
        if (!this.isAPrazo()) {
            this.lancamento.parcelas = 1;
            this.lancamento.observacao = '';
        }
    }

    update() {
        this.lancamento.observacao = JSON.stringify( {
            valorComanda: this.comanda.total,
            desconto: this.desconto,
            valorPago: this.valorPago,
            encargos: this.comanda.gorjeta
        } ) + '\n' + this.lancamento.observacao;
        console.log(this.lancamento);
        this.lancamento.comanda = this.comanda;
        this.lancamento.valor = this.valorPago - this.desconto;
        this.lancamento.isentrada = true;
    }

    close() {
        this.activeModal.dismiss('cancel');
    }

    salvar(){
        if (this.lancamento.colaborador) {
            this.update();
            this.lancamentoService.create(this.lancamento).subscribe(
                (l) =>  {
                    this.eventManager.broadcast(
                        { name: 'lancamentoListModification',
                            content: 'OK'}
                    );
                    this.eventManager.broadcast(
                        { name: 'comandaListModification',
                            content: 'OK'}
                    );
                    this.activeModal.close(l);
                }
            );
        } else {
            alert('Erro falha ao obter colaborador! atualize e tente novamente!');
        }
    }


}

@Component({
    selector: 'jhi-lancamento-fechar-popup',
    template: ''
})
export class LancamentoFecharPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lancamentoPopupService: LancamentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lancamentoPopupService
                .open(FecharComponent as Component, params['id'], true);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
