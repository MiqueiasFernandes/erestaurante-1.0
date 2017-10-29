import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cargo } from './cargo.model';
import { CargoPopupService } from './cargo-popup.service';
import { CargoService } from './cargo.service';

@Component({
    selector: 'jhi-cargo-delete-dialog',
    templateUrl: './cargo-delete-dialog.component.html'
})
export class CargoDeleteDialogComponent {

    cargo: Cargo;

    constructor(
        private cargoService: CargoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cargoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cargoListModification',
                content: 'Deleted an cargo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cargo-delete-popup',
    template: ''
})
export class CargoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cargoPopupService: CargoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cargoPopupService
                .open(CargoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
