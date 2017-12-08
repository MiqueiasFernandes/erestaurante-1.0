import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Impressora } from './impressora.model';
import { ImpressoraService } from './impressora.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-impressora',
    templateUrl: './impressora.component.html',
    styleUrls: ['./impressora.component.scss']
})
export class ImpressoraComponent implements OnInit, OnDestroy {
impressoras: Impressora[];
    currentAccount: any;
    eventSubscriber: Subscription;
    modoTabela = false;
    locais = [];

    constructor(
        private impressoraService: ImpressoraService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.impressoraService.query().subscribe(
            (res: ResponseWrapper) => {
                this.impressoras = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.impressoraService.queryLocaisDeImpressao().subscribe(
            locais => this.locais = locais
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInImpressoras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Impressora) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInImpressoras() {
        this.eventSubscriber = this.eventManager.subscribe('impressoraListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }


    setModoTabela() {
        this.modoTabela = !this.modoTabela;
    }

    setLocal(impressora, local) {
       impressora.local = local;
    }

    salvar(impressora) {
        this.impressoraService.update(impressora).subscribe(()=>{});
    }

}
