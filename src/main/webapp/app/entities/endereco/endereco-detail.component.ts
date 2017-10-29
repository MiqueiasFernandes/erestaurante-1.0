import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Endereco } from './endereco.model';
import { EnderecoService } from './endereco.service';

@Component({
    selector: 'jhi-endereco-detail',
    templateUrl: './endereco-detail.component.html'
})
export class EnderecoDetailComponent implements OnInit, OnDestroy {

    endereco: Endereco;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enderecoService: EnderecoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnderecos();
    }

    load(id) {
        this.enderecoService.find(id).subscribe((endereco) => {
            this.endereco = endereco;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnderecos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enderecoListModification',
            (response) => this.load(this.endereco.id)
        );
    }
}
