import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Colaborador } from './colaborador.model';
import { ColaboradorPopupService } from './colaborador-popup.service';
import { ColaboradorService } from './colaborador.service';

@Component({
    selector: 'jhi-colaborador-delete-dialog',
    templateUrl: './colaborador-delete-dialog.component.html'
})
export class ColaboradorDeleteDialogComponent {

    colaborador: Colaborador;

    constructor(
        private colaboradorService: ColaboradorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.colaboradorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'colaboradorListModification',
                content: 'Deleted an colaborador'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-colaborador-delete-popup',
    template: ''
})
export class ColaboradorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colaboradorPopupService: ColaboradorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.colaboradorPopupService
                .open(ColaboradorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
