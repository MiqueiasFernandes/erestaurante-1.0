import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Cardapio } from './cardapio.model';
import { CardapioPopupService } from './cardapio-popup.service';
import { CardapioService } from './cardapio.service';
import { Produto, ProdutoService } from '../produto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-cardapio-dialog',
    templateUrl: './cardapio-dialog.component.html',
    styleUrls: ['../../layouts/tableheader/tableheader.component.scss']
})
export class CardapioDialogComponent implements OnInit {

    cardapio: Cardapio;
    isSaving: boolean;

    produtos: Produto[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private cardapioService: CardapioService,
        private produtoService: ProdutoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.produtoService.query()
            .subscribe((res: ResponseWrapper) => { this.produtos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cardapio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardapioService.update(this.cardapio));
        } else {
            this.subscribeToSaveResponse(
                this.cardapioService.create(this.cardapio));
        }
    }

    private subscribeToSaveResponse(result: Observable<Cardapio>) {
        result.subscribe((res: Cardapio) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Cardapio) {
        this.eventManager.broadcast({ name: 'cardapioListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-cardapio-popup',
    template: ''
})
export class CardapioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardapioPopupService: CardapioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardapioPopupService
                    .open(CardapioDialogComponent as Component, params['id']);
            } else {
                this.cardapioPopupService
                    .open(CardapioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
