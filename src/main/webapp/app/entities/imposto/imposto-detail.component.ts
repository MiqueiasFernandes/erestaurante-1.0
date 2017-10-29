import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Imposto } from './imposto.model';
import { ImpostoService } from './imposto.service';

@Component({
    selector: 'jhi-imposto-detail',
    templateUrl: './imposto-detail.component.html'
})
export class ImpostoDetailComponent implements OnInit, OnDestroy {

    imposto: Imposto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private impostoService: ImpostoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInImpostos();
    }

    load(id) {
        this.impostoService.find(id).subscribe((imposto) => {
            this.imposto = imposto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInImpostos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'impostoListModification',
            (response) => this.load(this.imposto.id)
        );
    }
}
