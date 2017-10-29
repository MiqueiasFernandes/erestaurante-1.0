import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Colaborador } from './colaborador.model';
import { ColaboradorService } from './colaborador.service';

@Injectable()
export class ColaboradorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private colaboradorService: ColaboradorService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.colaboradorService.find(id).subscribe((colaborador) => {
                    colaborador.nascimento = this.datePipe
                        .transform(colaborador.nascimento, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.colaboradorModalRef(component, colaborador);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.colaboradorModalRef(component, new Colaborador());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    colaboradorModalRef(component: Component, colaborador: Colaborador): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.colaborador = colaborador;
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
