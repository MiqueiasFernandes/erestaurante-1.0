import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Lancamento } from './lancamento.model';
import { LancamentoService } from './lancamento.service';

@Component({
    selector: 'jhi-lancamento-detail',
    templateUrl: './lancamento-detail.component.html'
})
export class LancamentoDetailComponent implements OnInit, OnDestroy {

    lancamento: Lancamento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lancamentoService: LancamentoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLancamentos();
    }

    load(id) {
        this.lancamentoService.find(id).subscribe((lancamento) => {
            this.lancamento = lancamento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLancamentos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lancamentoListModification',
            (response) => this.load(this.lancamento.id)
        );
    }
}
