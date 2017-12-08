import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Produto } from './produto.model';
import { ProdutoPopupService } from './produto-popup.service';
import { ProdutoService } from './produto.service';
import { Imposto, ImpostoService } from '../imposto';
import { ResponseWrapper } from '../../shared';
import {ImpressoraService} from "../impressora/impressora.service";

@Component({
    selector: 'jhi-produto-dialog',
    templateUrl: './produto-dialog.component.html',
    styleUrls: ['./produto-dialog.component.scss']
})
export class ProdutoDialogComponent implements OnInit {

    produto: Produto;
    isSaving: boolean;
    temp = '';
    impostos: Imposto[];
    chipFocus = false;
    impressoras :string[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private produtoService: ProdutoService,
        private impostoService: ImpostoService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager,
        private impressoraService: ImpressoraService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.impostoService.query()
            .subscribe((res: ResponseWrapper) => { this.impostos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        if(!this.produto.descricao || this.produto.descricao.length < 1) {
            this.produto.descricao = 'Todos,Bebidas,Restaurante,Sobremesas,popular'
        }

        if (this.produto.descricao.startsWith(',')) {
            this.produto.descricao = this.produto.descricao.substring(1);
        }

        this.impressoraService.queryLocaisDeImpressao().subscribe(
            locais => this.impressoras = locais.filter(s => s !== 'nota' && s !== 'relatorio')
        );
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

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.produto, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.produto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.produtoService.update(this.produto));
        } else {
            this.subscribeToSaveResponse(
                this.produtoService.create(this.produto));
        }
    }

    private subscribeToSaveResponse(result: Observable<Produto>) {
        result.subscribe((res: Produto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Produto) {
        this.eventManager.broadcast({ name: 'produtoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackImpostoById(index: number, item: Imposto) {
        return item.id;
    }

    remover(key) {
        this.produto.descricao = this.produto.descricao.split(',')
            .filter( p => !p.match(key)).join(',');
    }

    adicionar() {
        const str = this.temp.replace(',', '');
        if (str && str.length > 0) {
            this.produto.descricao =
                this.produto.descricao += (',' + str);
            this.temp = '';
        }
    }


}

@Component({
    selector: 'jhi-produto-popup',
    template: ''
})
export class ProdutoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private produtoPopupService: ProdutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.produtoPopupService
                    .open(ProdutoDialogComponent as Component, params['id']);
            } else {
                this.produtoPopupService
                    .open(ProdutoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
