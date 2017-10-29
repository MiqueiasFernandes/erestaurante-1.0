import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Comanda } from './comanda.model';
import { ComandaService } from './comanda.service';

@Component({
    selector: 'jhi-comanda-detail',
    templateUrl: './comanda-detail.component.html'
})
export class ComandaDetailComponent implements OnInit, OnDestroy {

    comanda: Comanda;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comandaService: ComandaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComandas();
    }

    load(id) {
        this.comandaService.find(id).subscribe((comanda) => {
            this.comanda = comanda;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComandas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comandaListModification',
            (response) => this.load(this.comanda.id)
        );
    }
}
