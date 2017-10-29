import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Imposto } from './imposto.model';
import { ImpostoPopupService } from './imposto-popup.service';
import { ImpostoService } from './imposto.service';

@Component({
    selector: 'jhi-imposto-delete-dialog',
    templateUrl: './imposto-delete-dialog.component.html'
})
export class ImpostoDeleteDialogComponent {

    imposto: Imposto;

    constructor(
        private impostoService: ImpostoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.impostoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'impostoListModification',
                content: 'Deleted an imposto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-imposto-delete-popup',
    template: ''
})
export class ImpostoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private impostoPopupService: ImpostoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.impostoPopupService
                .open(ImpostoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
