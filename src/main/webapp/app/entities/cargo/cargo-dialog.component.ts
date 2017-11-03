import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import {isNullOrUndefined} from 'util';


import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import {Cargo, CargoTipo} from './cargo.model';
import { CargoPopupService } from './cargo-popup.service';
import { CargoService } from './cargo.service';

@Component({
    selector: 'jhi-cargo-dialog',
    templateUrl: './cargo-dialog.component.html',
    styleUrls: ['../../layouts/tableheader/tableheader.component.scss']
})
export class CargoDialogComponent implements OnInit {

    cargo: Cargo;
    isSaving: boolean;

    entidades: string[] = [
        "cardapio",   ///// GERENCIA   ATENDIMENTO v CAIXA v PRODUÇAO v ENTREGA v
        "cargo",      ///// GERENCIA
        "cliente",    ///// GERENCIA   ATENDIMENTO CAIXA ENTREGA
        "colaborador",///// GERENCIA    CAIXA
        "comanda",    ///// GERENCIA   ATENDIMENTO CAIXA
        "endereco",   ///// GERENCIA    CAIXA ENTREGA
        "imposto",    ///// GERENCIA    CAIXA
        "lancamento", ///// GERENCIA    CAIXA
        "mesa",       ///// GERENCIA   ATENDIMENTO CAIXA
        "nota",       ///// GERENCIA    CAIXA
        "produto",    ///// GERENCIA   ATENDIMENTO CAIXA  PRODUÇAO
        "restaurante",///// GERENCIA   CAIXA
        "venda"       ///// GERENCIA   ATENDIMENTO CAIXA  PRODUÇAO
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
        });
    }

    ngOnInit() {
        this.isSaving = false;
        if (!isNullOrUndefined(this.cargo) && !isNullOrUndefined(this.cargo.permissao) && this.cargo.permissao.length > 0) {
            this.cargo.permissao.split(',').forEach((privilegio: string) => {
                const data: string[] = privilegio.split("-");
                if (!isNullOrUndefined(data) && data.length === 2) {
                    this.checks[data[0]][data[1]] = true;
                }
            });
        }
    }


    alterarTipo() {///at caix entr prod

        this.entidades.forEach((ent: string) => {
            this.checks[ent] = this.getPermissaoDefault(ent);
        });
    }

    getPermissaoDefault(entidade) :boolean[]{

        let v=false, a=false, e=false,d=false;

        switch (entidade) {
            case "cardapio":   ///// GERENCIA   ATENDIMENTO v CAIXA v PRODUÇAO v ENTREGA v
                v = true;///Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                a = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO);/// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                e = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO);/// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                d = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                break;

            case      "cliente":
                v = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA);/// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                a = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                e = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                d = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);/// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                break;
            case       "comanda":
                v = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                a = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) ;//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                e = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA);////  || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                d = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                break;

            case       "endereco":
                v = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                a = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                e = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                d = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                break;

            case       "imposto":
            case      "lancamento":
            case      "nota":
                v = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) ;////|| Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                a = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) ;////| || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                e = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) ;////|ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                d = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) ;////|ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                break;

            case      "mesa":
            case      "produto":
            case      "restaurante":
            case       "cargo":
                v = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                a = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                e = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);/// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                d = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                break;
            case "colaborador":
                v = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                a = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                e = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);/// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                d = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA);//// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                break;
            case     "venda":       ///// GERENCIA   ATENDIMENTO CAIXA  PRODUÇAO
                v = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ENTREGA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                a = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA)  ;
                e = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;/// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
                d = Cargo.tipoEquals( this.cargo.tipo, CargoTipo.GERENCIA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA);// || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.ATENDIMENTO) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.CAIXA) || Cargo.tipoEquals( this.cargo.tipo, CargoTipo.PRODUCAO) ;
        }

        const bols: boolean[] = [];
        bols["visualizar"] =v;
        bols["adicionar"] = a;
        bols["editar"] = e;
        bols["deletar"] = d;
        return bols;
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
