import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mesa } from './mesa.model';
import { MesaPopupService } from './mesa-popup.service';
import { MesaService } from './mesa.service';

@Component({
    selector: 'jhi-mesa-delete-dialog',
    templateUrl: './mesa-delete-dialog.component.html'
})
export class MesaDeleteDialogComponent {

    mesa: Mesa;

    constructor(
        private mesaService: MesaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mesaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mesaListModification',
                content: 'Deleted an mesa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mesa-delete-popup',
    template: ''
})
export class MesaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mesaPopupService: MesaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mesaPopupService
                .open(MesaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
