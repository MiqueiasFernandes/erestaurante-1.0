import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cliente } from './cliente.model';
import { ClientePopupService } from './cliente-popup.service';
import { ClienteService } from './cliente.service';
import { Endereco, EnderecoService } from '../endereco';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-cliente-dialog',
    templateUrl: './cliente-dialog.component.html'
})
export class ClienteDialogComponent implements OnInit {

    cliente: Cliente;
    isSaving: boolean;

    enderecos: Endereco[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clienteService: ClienteService,
        private enderecoService: EnderecoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enderecoService
            .query({filter: 'cliente-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.cliente.endereco || !this.cliente.endereco.id) {
                    this.enderecos = res.json;
                } else {
                    this.enderecoService
                        .find(this.cliente.endereco.id)
                        .subscribe((subRes: Endereco) => {
                            this.enderecos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cliente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clienteService.update(this.cliente));
        } else {
            this.subscribeToSaveResponse(
                this.clienteService.create(this.cliente));
        }
    }

    private subscribeToSaveResponse(result: Observable<Cliente>) {
        result.subscribe((res: Cliente) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Cliente) {
        this.eventManager.broadcast({ name: 'clienteListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-cliente-popup',
    template: ''
})
export class ClientePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientePopupService: ClientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientePopupService
                    .open(ClienteDialogComponent as Component, params['id']);
            } else {
                this.clientePopupService
                    .open(ClienteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
