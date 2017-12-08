import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Impressora } from './impressora.model';
import { ImpressoraPopupService } from './impressora-popup.service';
import { ImpressoraService } from './impressora.service';

@Component({
    selector: 'jhi-impressora-dialog',
    templateUrl: './impressora-dialog.component.html'
})
export class ImpressoraDialogComponent implements OnInit {

    impressora: Impressora;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private impressoraService: ImpressoraService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.impressora.id !== undefined) {
            this.subscribeToSaveResponse(
                this.impressoraService.update(this.impressora));
        } else {
            this.subscribeToSaveResponse(
                this.impressoraService.create(this.impressora));
        }
    }

    private subscribeToSaveResponse(result: Observable<Impressora>) {
        result.subscribe((res: Impressora) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Impressora) {
        this.eventManager.broadcast({ name: 'impressoraListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-impressora-popup',
    template: ''
})
export class ImpressoraPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private impressoraPopupService: ImpressoraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.impressoraPopupService
                    .open(ImpressoraDialogComponent as Component, params['id']);
            } else {
                this.impressoraPopupService
                    .open(ImpressoraDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
