import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Venda } from './venda.model';
import { VendaPopupService } from './venda-popup.service';
import { VendaService } from './venda.service';
import { Produto, ProdutoService } from '../produto';
import { Comanda, ComandaService } from '../comanda';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-venda-dialog',
    templateUrl: './venda-dialog.component.html'
})
export class VendaDialogComponent implements OnInit {

    venda: Venda;
    isSaving: boolean;

    produtos: Produto[];

    comandas: Comanda[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vendaService: VendaService,
        private produtoService: ProdutoService,
        private comandaService: ComandaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.produtoService.query()
            .subscribe((res: ResponseWrapper) => { this.produtos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.comandaService.query()
            .subscribe((res: ResponseWrapper) => { this.comandas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.venda.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vendaService.update(this.venda));
        } else {
            this.subscribeToSaveResponse(
                this.vendaService.create(this.venda));
        }
    }

    private subscribeToSaveResponse(result: Observable<Venda>) {
        result.subscribe((res: Venda) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Venda) {
        this.eventManager.broadcast({ name: 'vendaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProdutoById(index: number, item: Produto) {
        return item.id;
    }

    trackComandaById(index: number, item: Comanda) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-venda-popup',
    template: ''
})
export class VendaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vendaPopupService: VendaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vendaPopupService
                    .open(VendaDialogComponent as Component, params['id']);
            } else {
                this.vendaPopupService
                    .open(VendaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
