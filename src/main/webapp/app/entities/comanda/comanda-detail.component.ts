import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import {Comanda, Status} from './comanda.model';
import { ComandaService } from './comanda.service';
import {Venda, VendaStatus} from "../venda/venda.model";
import {VendaService} from "../venda/venda.service";
import {AutologinService} from "../../shared/login/autologin.service";
import {NotifyService} from "../notify.service";

@Component({
    selector: 'jhi-comanda-detail',
    templateUrl: './comanda-detail.component.html'
})
export class ComandaDetailComponent implements OnInit, OnDestroy {

    comanda: Comanda;
    vendas: Venda[];
    isAutoLogin: boolean = false;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comandaService: ComandaService,
        private route: ActivatedRoute,
        private vendaService :VendaService,
        private autoLogin: AutologinService,
        private entityNotify: NotifyService,
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComandas();
        this.autoLogin.isAutoLogin().then((is) => {
            this.isAutoLogin = is;
        })
    }

    load(id) {
        this.comandaService.find(id).subscribe((comanda) => {
            this.comanda = comanda;
            this.vendaService.getVendasForComandaId(comanda.id, Venda.getAprovadosToString().join(',')).subscribe(vendas => {this.vendas = vendas});
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComandas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comandaListModification',
            (response) => this.load(this.comanda.id)
        );
    }

    noFechada() {
        return !Comanda.isFechada(this.comanda);
    }

    solicitarFechar() {
        this.entityNotify.sendMessage('comanda', 'fechar', this.comanda.id);
        this.previousState();
    }

    fechar() {
        if (this.isAutoLogin) {
            this.solicitarFechar();
            return;
        }
        this.comanda.status = Status.FECHADA;
        this.comandaService.update(this.comanda).subscribe((c) => {
            this.previousState();
        });
    }
}
