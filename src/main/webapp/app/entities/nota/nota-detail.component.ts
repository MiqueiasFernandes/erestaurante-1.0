import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Nota } from './nota.model';
import { NotaService } from './nota.service';

@Component({
    selector: 'jhi-nota-detail',
    templateUrl: './nota-detail.component.html'
})
export class NotaDetailComponent implements OnInit, OnDestroy {

    nota: Nota;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private notaService: NotaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotas();
    }

    load(id) {
        this.notaService.find(id).subscribe((nota) => {
            this.nota = nota;
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

    registerChangeInNotas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notaListModification',
            (response) => this.load(this.nota.id)
        );
    }
}
