import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Comanda } from './comanda.model';
import { ComandaPopupService } from './comanda-popup.service';
import { ComandaService } from './comanda.service';

@Component({
    selector: 'jhi-comanda-delete-dialog',
    templateUrl: './comanda-delete-dialog.component.html'
})
export class ComandaDeleteDialogComponent {

    comanda: Comanda;

    constructor(
        private comandaService: ComandaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comandaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'comandaListModification',
                content: 'Deleted an comanda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comanda-delete-popup',
    template: ''
})
export class ComandaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comandaPopupService: ComandaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.comandaPopupService
                .open(ComandaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
