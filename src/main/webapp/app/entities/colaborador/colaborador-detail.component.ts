import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Colaborador } from './colaborador.model';
import { ColaboradorService } from './colaborador.service';

@Component({
    selector: 'jhi-colaborador-detail',
    templateUrl: './colaborador-detail.component.html'
})
export class ColaboradorDetailComponent implements OnInit, OnDestroy {

    colaborador: Colaborador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private colaboradorService: ColaboradorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInColaboradors();
    }

    load(id) {
        this.colaboradorService.find(id).subscribe((colaborador) => {
            this.colaborador = colaborador;
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

    registerChangeInColaboradors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'colaboradorListModification',
            (response) => this.load(this.colaborador.id)
        );
    }
}
