import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Lancamento } from './lancamento.model';
import { LancamentoPopupService } from './lancamento-popup.service';
import { LancamentoService } from './lancamento.service';

@Component({
    selector: 'jhi-lancamento-delete-dialog',
    templateUrl: './lancamento-delete-dialog.component.html'
})
export class LancamentoDeleteDialogComponent {

    lancamento: Lancamento;

    constructor(
        private lancamentoService: LancamentoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lancamentoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lancamentoListModification',
                content: 'Deleted an lancamento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lancamento-delete-popup',
    template: ''
})
export class LancamentoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lancamentoPopupService: LancamentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lancamentoPopupService
                .open(LancamentoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
