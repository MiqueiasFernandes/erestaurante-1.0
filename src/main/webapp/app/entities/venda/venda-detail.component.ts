import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Venda } from './venda.model';
import { VendaService } from './venda.service';

@Component({
    selector: 'jhi-venda-detail',
    templateUrl: './venda-detail.component.html'
})
export class VendaDetailComponent implements OnInit, OnDestroy {

    venda: Venda;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vendaService: VendaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVendas();
    }

    load(id) {
        this.vendaService.find(id).subscribe((venda) => {
            this.venda = venda;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVendas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vendaListModification',
            (response) => this.load(this.venda.id)
        );
    }
}
