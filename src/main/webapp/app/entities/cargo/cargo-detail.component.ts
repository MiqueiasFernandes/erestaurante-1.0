import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Cargo } from './cargo.model';
import { CargoService } from './cargo.service';

@Component({
    selector: 'jhi-cargo-detail',
    templateUrl: './cargo-detail.component.html'
})
export class CargoDetailComponent implements OnInit, OnDestroy {

    cargo: Cargo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private cargoService: CargoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCargos();
    }

    load(id) {
        this.cargoService.find(id).subscribe((cargo) => {
            this.cargo = cargo;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCargos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cargoListModification',
            (response) => this.load(this.cargo.id)
        );
    }
}
