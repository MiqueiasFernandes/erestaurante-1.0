import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Restaurante } from './restaurante.model';
import { RestaurantePopupService } from './restaurante-popup.service';
import { RestauranteService } from './restaurante.service';

@Component({
    selector: 'jhi-restaurante-delete-dialog',
    templateUrl: './restaurante-delete-dialog.component.html'
})
export class RestauranteDeleteDialogComponent {

    restaurante: Restaurante;

    constructor(
        private restauranteService: RestauranteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.restauranteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'restauranteListModification',
                content: 'Deleted an restaurante'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-restaurante-delete-popup',
    template: ''
})
export class RestauranteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restaurantePopupService: RestaurantePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.restaurantePopupService
                .open(RestauranteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
