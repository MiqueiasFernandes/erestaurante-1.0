import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Restaurante } from './restaurante.model';
import { RestaurantePopupService } from './restaurante-popup.service';
import { RestauranteService } from './restaurante.service';
import { Endereco, EnderecoService } from '../endereco';
import { Colaborador, ColaboradorService } from '../colaborador';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-restaurante-dialog',
    templateUrl: './restaurante-dialog.component.html'
})
export class RestauranteDialogComponent implements OnInit {

    restaurante: Restaurante;
    isSaving: boolean;

    enderecos: Endereco[];

    colaboradors: Colaborador[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private restauranteService: RestauranteService,
        private enderecoService: EnderecoService,
        private colaboradorService: ColaboradorService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enderecoService
            .query({filter: 'restaurante-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.restaurante.endereco || !this.restaurante.endereco.id) {
                    this.enderecos = res.json;
                } else {
                    this.enderecoService
                        .find(this.restaurante.endereco.id)
                        .subscribe((subRes: Endereco) => {
                            this.enderecos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.colaboradorService.query()
            .subscribe((res: ResponseWrapper) => { this.colaboradors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.restaurante, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.restaurante.id !== undefined) {
            this.subscribeToSaveResponse(
                this.restauranteService.update(this.restaurante));
        } else {
            this.subscribeToSaveResponse(
                this.restauranteService.create(this.restaurante));
        }
    }

    private subscribeToSaveResponse(result: Observable<Restaurante>) {
        result.subscribe((res: Restaurante) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Restaurante) {
        this.eventManager.broadcast({ name: 'restauranteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnderecoById(index: number, item: Endereco) {
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
    selector: 'jhi-restaurante-popup',
    template: ''
})
export class RestaurantePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restaurantePopupService: RestaurantePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.restaurantePopupService
                    .open(RestauranteDialogComponent as Component, params['id']);
            } else {
                this.restaurantePopupService
                    .open(RestauranteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
