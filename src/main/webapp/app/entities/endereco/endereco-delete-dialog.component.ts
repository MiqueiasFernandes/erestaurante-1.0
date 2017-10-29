import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Endereco } from './endereco.model';
import { EnderecoPopupService } from './endereco-popup.service';
import { EnderecoService } from './endereco.service';

@Component({
    selector: 'jhi-endereco-delete-dialog',
    templateUrl: './endereco-delete-dialog.component.html'
})
export class EnderecoDeleteDialogComponent {

    endereco: Endereco;

    constructor(
        private enderecoService: EnderecoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enderecoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enderecoListModification',
                content: 'Deleted an endereco'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-endereco-delete-popup',
    template: ''
})
export class EnderecoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enderecoPopupService: EnderecoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enderecoPopupService
                .open(EnderecoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
