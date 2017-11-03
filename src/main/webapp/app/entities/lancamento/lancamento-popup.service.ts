import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Lancamento } from './lancamento.model';
import { LancamentoService } from './lancamento.service';
import {ComandaService} from "../comanda/comanda.service";

@Injectable()
export class LancamentoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private lancamentoService: LancamentoService,
        private comandaService: ComandaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, comanda?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.lancamentoService.find(id).subscribe((lancamento) => {
                    lancamento.data = this.datePipe
                        .transform(lancamento.data, 'yyyy-MM-ddTHH:mm:ss');
                    lancamento.vencimento = this.datePipe
                        .transform(lancamento.vencimento, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.lancamentoModalRef(component, lancamento);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    let lancamento = new Lancamento();
                    if (comanda) {
                        this.comandaService.find(comanda).subscribe((c) => {
                            lancamento.comanda = c;
                            this.ngbModalRef = this.lancamentoModalRef(component, lancamento);
                        });
                    } else {

                        this.ngbModalRef = this.lancamentoModalRef(component, lancamento);
                    }
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    lancamentoModalRef(component: Component, lancamento: Lancamento): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lancamento = lancamento;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
