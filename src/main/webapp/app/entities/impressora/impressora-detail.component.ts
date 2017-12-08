import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Impressora } from './impressora.model';
import { ImpressoraService } from './impressora.service';

@Component({
    selector: 'jhi-impressora-detail',
    templateUrl: './impressora-detail.component.html'
})
export class ImpressoraDetailComponent implements OnInit, OnDestroy {

    impressora: Impressora;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private impressoraService: ImpressoraService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInImpressoras();
    }

    load(id) {
        this.impressoraService.find(id).subscribe((impressora) => {
            this.impressora = impressora;
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

    registerChangeInImpressoras() {
        this.eventSubscriber = this.eventManager.subscribe(
            'impressoraListModification',
            (response) => this.load(this.impressora.id)
        );
    }
}
