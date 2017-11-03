import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mesa } from './mesa.model';
import { MesaService } from './mesa.service';
import {isNullOrUndefined} from "util";

@Injectable()
export class MesaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private mesaService: MesaService

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
                if(!new String(id).match(/\d+/)){

                    this.mesaService.findByCodigo(id).subscribe((mesa) => {
                        if (!isNullOrUndefined(mesa)){
                            this.ngbModalRef = this.mesaModalRef(component, mesa);
                            resolve(this.ngbModalRef);
                        }
                    });

                } else {
                    this.mesaService.find(id).subscribe((mesa) => {
                        this.ngbModalRef = this.mesaModalRef(component, mesa);
                        resolve(this.ngbModalRef);
                    });
                }
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.mesaModalRef(component, new Mesa());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mesaModalRef(component: Component, mesa: Mesa): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mesa = mesa;
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
