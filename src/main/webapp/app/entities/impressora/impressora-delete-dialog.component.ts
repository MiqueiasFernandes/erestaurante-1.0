import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Impressora } from './impressora.model';
import { ImpressoraPopupService } from './impressora-popup.service';
import { ImpressoraService } from './impressora.service';

@Component({
    selector: 'jhi-impressora-delete-dialog',
    templateUrl: './impressora-delete-dialog.component.html'
})
export class ImpressoraDeleteDialogComponent {

    impressora: Impressora;

    constructor(
        private impressoraService: ImpressoraService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.impressoraService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'impressoraListModification',
                content: 'Deleted an impressora'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-impressora-delete-popup',
    template: ''
})
export class ImpressoraDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private impressoraPopupService: ImpressoraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.impressoraPopupService
                .open(ImpressoraDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
