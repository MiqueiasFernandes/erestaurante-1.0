import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Nota } from './nota.model';
import { NotaPopupService } from './nota-popup.service';
import { NotaService } from './nota.service';

@Component({
    selector: 'jhi-nota-delete-dialog',
    templateUrl: './nota-delete-dialog.component.html'
})
export class NotaDeleteDialogComponent {

    nota: Nota;

    constructor(
        private notaService: NotaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notaListModification',
                content: 'Deleted an nota'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nota-delete-popup',
    template: ''
})
export class NotaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notaPopupService: NotaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notaPopupService
                .open(NotaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
