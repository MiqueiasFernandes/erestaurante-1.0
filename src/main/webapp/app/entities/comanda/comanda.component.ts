import {Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ApplicationRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import {Comanda, Status} from './comanda.model';
import { ComandaService } from './comanda.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

import {ColaboradorService} from "../colaborador/colaborador.service";
import {Cargo, CargoTipo} from "../cargo/cargo.model";
import {isNullOrUndefined} from "util";
import {NotifyService} from "../notify.service";
import {Colaborador} from "../colaborador/colaborador.model";
import {Cliente} from "../cliente/cliente.model";
import {Mesa} from '../mesa/mesa.model';
import {VendaService} from "../venda/venda.service";
import {Venda, VendaStatus} from "../venda/venda.model";
import {LancamentoService} from "../lancamento/lancamento.service";
import {Lancamento} from "../lancamento/lancamento.model";


@Component({
    selector: 'jhi-comanda',
    templateUrl: './comanda.component.html',
    styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit, OnDestroy {
    @ViewChild('tableH', {read: ViewContainerRef}) tableHeader;

    comandas: Comanda[];
    currentAccount: any;
    eventSubscriber: Subscription;
    modo :Modo = Modo.ADMIN;
    alteradas = [];
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    comandasInvalidas :string[]= [];
    comandasPendentes = [];
    pago :number[] = [];

    constructor(
        private comandaService: ComandaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private colaboradorService: ColaboradorService,
        private principal: Principal,
        private entityNotify: NotifyService,
        private appref :ApplicationRef,
        private vendaService :VendaService,
        private lancamentoService: LancamentoService
    ) {
        this.comandas = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.comandas = [];
        this.comandasInvalidas = [];
        if (this.modo === Modo.CAIXA) {
            this.comandaService.findByStatus(Status.ABERTA).subscribe(
                (res: ResponseWrapper) => {
                    this.comandas = this.comandas.concat(res.json);
                    this.loadVendas();
                    this.appref.tick();
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
            this.comandaService.findByStatus(Status.FECHADA).subscribe(
                (res: ResponseWrapper) => {
                    this.comandas = this.comandas.concat(res.json);
                    this.loadVendas();
                    this.appref.tick();
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
            return;
        }

        this.comandaService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }


    // updateMesas(comanda) {
    //     if ((!comanda.mesas || comanda.mesas.length < 1) && this.comandasInvalidas.indexOf(comanda.codigo) < 0) {
    //         this.comandasInvalidas.push(comanda.codigo);
    //         console.log(this.comandas);
    //         this.comandas = this.comandas.filter(c2 => c2.id !== comanda.id);
    //         console.log(this.comandas);
    //         this.comandaService.find(comanda.id).subscribe((c :Comanda) => {
    //             console.log(c);
    //             if (comanda.mesas && comanda.mesas.length > 0) {
    //                 // this.comandas.push(c);
    //                 this.comandasInvalidas = this.comandasInvalidas.filter(ci => !ci.match(c.codigo));
    //                 this.appref.tick();
    //             }
    //         });
    //     }
    //     return comanda.mesas;
    // }



    loadVendas() {
        console.log(this.comandas);
        this.comandas.forEach(comanda => {
            this.vendaService.getVendasForComandaId(
                comanda.id, Venda.getPendentesToString().join(','))
                .subscribe(vendas => {
                        vendas.forEach(v => {
                            if (!v.isEntregue()) {
                                this.comandasPendentes.push(comanda.id);
                            }
                        });
                    }
                );
            this.lancamentoService.findByComanda(comanda.id).subscribe(
                (res) => {
                    const lancamentos: Lancamento[] = res.json;
                    let total = 0.0;
                    lancamentos.forEach(l => l.isentrada ? total += l.valor : total -= l.valor);
                    this.pago[comanda.id] = total;
                }
            );
        });
    }

    entregarProdutos(comanda){
        this.vendaService.getVendasForComandaId(
            comanda.id, Venda.getPendentesToString().join(','))
            .subscribe(vendas => {
                    vendas.forEach(v => {
                        if (!v.isEntregue()) {
                            v.status = VendaStatus.ENTREGUE;
                            v.data = this.vendaData(v);
                            this.vendaService.update(v).subscribe(() => this.verificar(comanda.id));
                        }
                    });
                }
            );
    }

    vendaData(venda: Venda) {
        return venda.data ? new Date(venda.data).toISOString()
            .replace('T', ' ')
            .replace('Z', '') : '';
    }

    verificar(id) {
        if (this.comandasPendentes.indexOf(id) >= 0) {
            this.vendaService.getVendasForComandaId(
                id, Venda.getPendentesToString().join(','))
                .subscribe(vendas => {
                    console.log(vendas);
                    if (vendas.length < 1) {
                        this.comandasPendentes = this.comandasPendentes.filter(num => num !== id);
                    }
                });
        }
    }


    reset() {
        this.page = 0;
        this.comandas = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;

            this.colaboradorService.getCurrentColaborador().toPromise().then(
                (colaborador) => {
                    if (colaborador.cargos.some(
                            (cargo) => Cargo.tipoEquals(cargo, CargoTipo.CAIXA))) {
                        this.modo = Modo.CAIXA;
                        this.tableHeader.clear();
                    }
                    this.loadAll();
                }
            );

            this.entityNotify.subscribe();
            this.entityNotify.receive()
                .subscribe((data: {entidade :string, id :number, message :string}) => {
                    if (
                        !isNullOrUndefined(data.entidade) &&
                        !isNullOrUndefined(data.message) &&
                        (data.entidade.startsWith('comanda') || data.entidade.startsWith('venda'))) {

                        if (data.entidade.startsWith('comanda') && data.message.startsWith('fechar')) {
                            let c = this.comandas.find(c => c.id === data.id);
                            if (c) {
                                c.status = Status.FECHADA;
                                this.comandaService.update(c).subscribe(
                                    () => {
                                        this.alteradas[c.id] = true;
                                        this.loadAll();
                                        this.appref.tick();
                                    }
                                );
                            }
                        } else {
                            this.loadAll();
                            this.appref.tick();
                        }
                    }
                });
        });
        this.registerChangeInComandas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Comanda) {
        return item.id;
    }
    registerChangeInComandas() {
        this.eventSubscriber = this.eventManager.subscribe('comandaListModification', (response) => this.reset());
        this.eventSubscriber = this.eventManager.subscribe('lancamentoListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.comandas = [];
        this.comandasInvalidas = [];
        for (let i = 0; i < data.length; i++) {
            this.comandaService
                .find((data[i] as Comanda ).id)
                .subscribe((c) => {
                    this.comandas.push(c);
                    if (!c.mesas || !c.codigo || !c.pagador || !c.colaboradores) {
                        this.comandasInvalidas.push(c.id.toFixed());
                    }
                });
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }



    getMesas(comanda :Comanda) {
        return comanda.mesas.map(m => (m as Mesa).codigo).join(', ');
    }

    getCliente(comanda :Comanda) {
        return (comanda.pagador as Cliente).nome;
    }

    getColaboradores(comanda :Comanda) {
        return comanda.colaboradores.map(c => (c as Colaborador).nome).join(', ');
    }

    comandaAberta(comanda :Comanda) {
        return !Comanda.tipoEquals(Status.ABERTA, comanda.status);
    }

    fechar(comanda :Comanda){
        comanda.status = Status.FECHADA;
        this.comandaService.update(comanda).subscribe(() => this.loadAll());
    }

}

export const enum Modo {
    'CAIXA',
    'ADMIN'
}

