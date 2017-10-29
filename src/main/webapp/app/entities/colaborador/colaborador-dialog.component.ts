import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Colaborador } from './colaborador.model';
import { ColaboradorPopupService } from './colaborador-popup.service';
import { ColaboradorService } from './colaborador.service';
import { User, UserService } from '../../shared';
import { Endereco, EnderecoService } from '../endereco';
import { Cargo, CargoService } from '../cargo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-colaborador-dialog',
    templateUrl: './colaborador-dialog.component.html'
})
export class ColaboradorDialogComponent implements OnInit {

    colaborador: Colaborador;
    isSaving: boolean;

    users: User[];

    enderecos: Endereco[];

    cargos: Cargo[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private colaboradorService: ColaboradorService,
        private userService: UserService,
        private enderecoService: EnderecoService,
        private cargoService: CargoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.enderecoService
            .query({filter: 'colaborador-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.colaborador.endereco || !this.colaborador.endereco.id) {
                    this.enderecos = res.json;
                } else {
                    this.enderecoService
                        .find(this.colaborador.endereco.id)
                        .subscribe((subRes: Endereco) => {
                            this.enderecos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.cargoService.query()
            .subscribe((res: ResponseWrapper) => { this.cargos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.colaborador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.colaboradorService.update(this.colaborador));
        } else {
            this.subscribeToSaveResponse(
                this.colaboradorService.create(this.colaborador));
        }
    }

    private subscribeToSaveResponse(result: Observable<Colaborador>) {
        result.subscribe((res: Colaborador) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Colaborador) {
        this.eventManager.broadcast({ name: 'colaboradorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackEnderecoById(index: number, item: Endereco) {
        return item.id;
    }

    trackCargoById(index: number, item: Cargo) {
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
    selector: 'jhi-colaborador-popup',
    template: ''
})
export class ColaboradorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colaboradorPopupService: ColaboradorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.colaboradorPopupService
                    .open(ColaboradorDialogComponent as Component, params['id']);
            } else {
                this.colaboradorPopupService
                    .open(ColaboradorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
