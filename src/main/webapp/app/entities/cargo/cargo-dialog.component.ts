import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import {isNullOrUndefined} from 'util';


import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Cargo } from './cargo.model';
import { CargoPopupService } from './cargo-popup.service';
import { CargoService } from './cargo.service';

@Component({
    selector: 'jhi-cargo-dialog',
    templateUrl: './cargo-dialog.component.html'
})
export class CargoDialogComponent implements OnInit {

    cargo: Cargo;
    isSaving: boolean;

    entidades: string[] = [
        "cardapio",
        "cargo",
        "cliente",
        "colaborador",
        "comanda",
        "endereco",
        "imposto",
        "lancamento",
        "mesa",
        "nota",
        "produto",
        "restaurante",
        "venda"
    ];

    niveis: string[] = [
        "visualizar",
        "adicionar",
        "editar",
        "deletar"
    ];

    checks: boolean[][] = [];



    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private cargoService: CargoService,
        private eventManager: JhiEventManager
    ) {
        this.entidades.forEach((ent :string) => {

            const bols:boolean[] = [];

            bols["visualizar"] = false;
            bols["adicionar"] = false;
            bols["editar"] = false;
            bols["deletar"] = false;

            this.checks[ent] = bols;
        })
    }

    ngOnInit() {
this.isSaving = false;
 this.cargo.permissao.split(',').forEach((privilegio: string) => {
            const data: string[] = privilegio.split("-");
            if (!isNullOrUndefined(data) && data.length === 2) {
                this.checks[data[0]][data[1]] = true;
            }
        });
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

        let priv = "";

        this.entidades.forEach((ent :string) => {
            this.niveis.forEach((nv: string) => {
                if (this.checks[ent][nv]) {
                    priv += ent + "-" + nv + ",";
                }
            });
        });


        this.cargo.permissao = priv;

        if (this.cargo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cargoService.update(this.cargo));
        } else {
            this.subscribeToSaveResponse(
                this.cargoService.create(this.cargo));
        }
    }

  setCheck(checked: boolean, entidade: string, nivel: string) {
        this.checks[entidade][nivel] = checked;
        console.log(checked + entidade + nivel);
        console.log(this.checks);
    }
    private subscribeToSaveResponse(result: Observable<Cargo>) {
        result.subscribe((res: Cargo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Cargo) {
        this.eventManager.broadcast({ name: 'cargoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-cargo-popup',
    template: ''
})
export class CargoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cargoPopupService: CargoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cargoPopupService
                    .open(CargoDialogComponent as Component, params['id']);
            } else {
                this.cargoPopupService
                    .open(CargoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
