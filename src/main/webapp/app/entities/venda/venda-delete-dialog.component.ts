import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Venda } from './venda.model';
import { VendaPopupService } from './venda-popup.service';
import { VendaService } from './venda.service';

@Component({
    selector: 'jhi-venda-delete-dialog',
    templateUrl: './venda-delete-dialog.component.html'
})
export class VendaDeleteDialogComponent {

    venda: Venda;

    constructor(
        private vendaService: VendaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vendaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vendaListModification',
                content: 'Deleted an venda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-venda-delete-popup',
    template: ''
})
export class VendaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vendaPopupService: VendaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vendaPopupService
                .open(VendaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
