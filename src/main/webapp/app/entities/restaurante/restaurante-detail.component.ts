import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Restaurante } from './restaurante.model';
import { RestauranteService } from './restaurante.service';

@Component({
    selector: 'jhi-restaurante-detail',
    templateUrl: './restaurante-detail.component.html'
})
export class RestauranteDetailComponent implements OnInit, OnDestroy {

    restaurante: Restaurante;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private restauranteService: RestauranteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRestaurantes();
    }

    load(id) {
        this.restauranteService.find(id).subscribe((restaurante) => {
            this.restaurante = restaurante;
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

    registerChangeInRestaurantes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'restauranteListModification',
            (response) => this.load(this.restaurante.id)
        );
    }
}
