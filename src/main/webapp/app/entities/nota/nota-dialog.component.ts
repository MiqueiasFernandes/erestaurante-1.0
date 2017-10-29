import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Nota } from './nota.model';
import { NotaPopupService } from './nota-popup.service';
import { NotaService } from './nota.service';
import { Imposto, ImpostoService } from '../imposto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-nota-dialog',
    templateUrl: './nota-dialog.component.html'
})
export class NotaDialogComponent implements OnInit {

    nota: Nota;
    isSaving: boolean;

    impostos: Imposto[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private notaService: NotaService,
        private impostoService: ImpostoService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.impostoService.query()
            .subscribe((res: ResponseWrapper) => { this.impostos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        this.dataUtils.clearInputImage(this.nota, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.nota.id !== undefined) {
            this.subscribeToSaveResponse(
                this.notaService.update(this.nota));
        } else {
            this.subscribeToSaveResponse(
                this.notaService.create(this.nota));
        }
    }

    private subscribeToSaveResponse(result: Observable<Nota>) {
        result.subscribe((res: Nota) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Nota) {
        this.eventManager.broadcast({ name: 'notaListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-nota-popup',
    template: ''
})
export class NotaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notaPopupService: NotaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notaPopupService
                    .open(NotaDialogComponent as Component, params['id']);
            } else {
                this.notaPopupService
                    .open(NotaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
