import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Impressora } from './impressora.model';
import { ImpressoraService } from './impressora.service';

@Injectable()
export class ImpressoraPopupService {
    private ngbModalRef: NgbModalRef;
    private intent = false;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private impressoraService: ImpressoraService

    ) {
        this.ngbModalRef = null;
    }

    public getngbModalRef():Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.ngbModalRef) {
                resolve(this.ngbModalRef.componentInstance);
            }
            setTimeout(() =>{
                if (this.ngbModalRef) {
                    resolve(this.ngbModalRef.componentInstance);
                } else {
                    reject(this.intent ? 'Timeout Esgotado' : 'Segunda chamada sem intent de primeira');
                }
            }, 500);
        });
    }

    open(component: Component, id?: number | any, data?: number | any): Promise<NgbModalRef> {
        this.intent = true;
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {

                    this.impressoraService.find(id).subscribe((impressora) => {

                        if (data && impressora.script) {
                            try {
                                impressora.script = JSON.parse(impressora.script);
                                const script = impressora.script.data.find(dt => dt.id === data);
                                impressora.script.data = [];
                                impressora.script.data.push(script);
                            } catch (e) {
                                alert('Houve um erro ao tentar visualizar impressão!');
                               console.error(e);
                               reject(e);
                            }
                        }

                        this.ngbModalRef = this.impressoraModalRef(component, impressora);
                        resolve(this.ngbModalRef);
                        this.intent = false;
                    });

            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.impressoraModalRef(component, new Impressora());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    impressoraModalRef(component: Component, impressora :Impressora): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.impressora = impressora;
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
