import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cardapio } from './cardapio.model';
import { CardapioPopupService } from './cardapio-popup.service';
import { CardapioService } from './cardapio.service';

@Component({
    selector: 'jhi-cardapio-delete-dialog',
    templateUrl: './cardapio-delete-dialog.component.html'
})
export class CardapioDeleteDialogComponent {

    cardapio: Cardapio;

    constructor(
        private cardapioService: CardapioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardapioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cardapioListModification',
                content: 'Deleted an cardapio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cardapio-delete-popup',
    template: ''
})
export class CardapioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardapioPopupService: CardapioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cardapioPopupService
                .open(CardapioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
