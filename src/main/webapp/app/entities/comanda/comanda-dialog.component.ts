import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Comanda } from './comanda.model';
import { ComandaPopupService } from './comanda-popup.service';
import { ComandaService } from './comanda.service';
import { Nota, NotaService } from '../nota';
import { Cliente, ClienteService } from '../cliente';
import { Mesa, MesaService } from '../mesa';
import { Colaborador, ColaboradorService } from '../colaborador';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-comanda-dialog',
    templateUrl: './comanda-dialog.component.html'
})
export class ComandaDialogComponent implements OnInit {

    comanda: Comanda;
    isSaving: boolean;

    notas: Nota[];

    clientes: Cliente[];

    mesas: Mesa[];

    colaboradors: Colaborador[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private comandaService: ComandaService,
        private notaService: NotaService,
        private clienteService: ClienteService,
        private mesaService: MesaService,
        private colaboradorService: ColaboradorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.notaService
            .query({filter: 'comanda-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.comanda.nota || !this.comanda.nota.id) {
                    this.notas = res.json;
                } else {
                    this.notaService
                        .find(this.comanda.nota.id)
                        .subscribe((subRes: Nota) => {
                            this.notas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.clienteService.query()
            .subscribe((res: ResponseWrapper) => { this.clientes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.mesaService.query()
            .subscribe((res: ResponseWrapper) => { this.mesas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.colaboradorService.query()
            .subscribe((res: ResponseWrapper) => { this.colaboradors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comanda.id !== undefined) {
            this.subscribeToSaveResponse(
                this.comandaService.update(this.comanda));
        } else {
            this.subscribeToSaveResponse(
                this.comandaService.create(this.comanda));
        }
    }

    private subscribeToSaveResponse(result: Observable<Comanda>) {
        result.subscribe((res: Comanda) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Comanda) {
        this.eventManager.broadcast({ name: 'comandaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackNotaById(index: number, item: Nota) {
        return item.id;
    }

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }

    trackMesaById(index: number, item: Mesa) {
        return item.id;
    }

    trackColaboradorById(index: number, item: Colaborador) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-comanda-popup',
    template: ''
})
export class ComandaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comandaPopupService: ComandaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.comandaPopupService
                    .open(ComandaDialogComponent as Component, params['id']);
            } else {
                this.comandaPopupService
                    .open(ComandaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
