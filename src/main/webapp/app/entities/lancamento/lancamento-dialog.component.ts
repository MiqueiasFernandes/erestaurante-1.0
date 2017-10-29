import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Lancamento } from './lancamento.model';
import { LancamentoPopupService } from './lancamento-popup.service';
import { LancamentoService } from './lancamento.service';
import { Comanda, ComandaService } from '../comanda';
import { Colaborador, ColaboradorService } from '../colaborador';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lancamento-dialog',
    templateUrl: './lancamento-dialog.component.html'
})
export class LancamentoDialogComponent implements OnInit {

    lancamento: Lancamento;
    isSaving: boolean;

    comandas: Comanda[];

    colaboradors: Colaborador[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lancamentoService: LancamentoService,
        private comandaService: ComandaService,
        private colaboradorService: ColaboradorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.comandaService.query()
            .subscribe((res: ResponseWrapper) => { this.comandas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.colaboradorService.query()
            .subscribe((res: ResponseWrapper) => { this.colaboradors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lancamento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lancamentoService.update(this.lancamento));
        } else {
            this.subscribeToSaveResponse(
                this.lancamentoService.create(this.lancamento));
        }
    }

    private subscribeToSaveResponse(result: Observable<Lancamento>) {
        result.subscribe((res: Lancamento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Lancamento) {
        this.eventManager.broadcast({ name: 'lancamentoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackComandaById(index: number, item: Comanda) {
        return item.id;
    }

    trackColaboradorById(index: number, item: Colaborador) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-lancamento-popup',
    template: ''
})
export class LancamentoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lancamentoPopupService: LancamentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lancamentoPopupService
                    .open(LancamentoDialogComponent as Component, params['id']);
            } else {
                this.lancamentoPopupService
                    .open(LancamentoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
