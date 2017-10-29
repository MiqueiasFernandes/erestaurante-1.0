import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Imposto } from './imposto.model';
import { ImpostoPopupService } from './imposto-popup.service';
import { ImpostoService } from './imposto.service';

@Component({
    selector: 'jhi-imposto-dialog',
    templateUrl: './imposto-dialog.component.html'
})
export class ImpostoDialogComponent implements OnInit {

    imposto: Imposto;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private impostoService: ImpostoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.imposto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.impostoService.update(this.imposto));
        } else {
            this.subscribeToSaveResponse(
                this.impostoService.create(this.imposto));
        }
    }

    private subscribeToSaveResponse(result: Observable<Imposto>) {
        result.subscribe((res: Imposto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Imposto) {
        this.eventManager.broadcast({ name: 'impostoListModification', content: 'OK'});
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
    selector: 'jhi-imposto-popup',
    template: ''
})
export class ImpostoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private impostoPopupService: ImpostoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.impostoPopupService
                    .open(ImpostoDialogComponent as Component, params['id']);
            } else {
                this.impostoPopupService
                    .open(ImpostoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
