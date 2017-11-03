import {
    Directive,
    ElementRef,
    ComponentFactoryResolver,
    ViewContainerRef,
    AfterViewInit,
    Input, ViewChild, OnDestroy
} from '@angular/core';

import {TableheaderComponent} from "../../layouts/tableheader/tableheader.component";
import {isNullOrUndefined} from "util";


import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';



@Directive({
    selector: '[jhiTableheader]'
})
export class TableheaderDirective implements AfterViewInit, OnDestroy{

    factory = this.componentFactoryResolver.resolveComponentFactory(TableheaderComponent);

    colunas :string[] = [];
    checksHeader :boolean[] = [];
    switches :string[] = [];
    colunasRef :ElementRef[][] = [];
    tableHeaderInstance :TableheaderComponent;
    opt = null;
    eventSubscriber: Subscription;

    registerChanges() {
        this.eventSubscriber = this.eventManager.
        subscribe(this.opt.entidade + 'ListModification',
            (response) => {
                setTimeout(()=> {
                    this.jhiTableheader = this.opt;
                    this.ngAfterViewInit();
                }, 5000);
            });
    }

    ngOnDestroy() {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }

    @Input()
    set jhiTableheader(opt :{view :ViewContainerRef, entidade: string}) {

        if (isNullOrUndefined(opt.view)){
            return;
        }

        if (isNullOrUndefined(this.opt)){
          this.opt = opt;
          this.registerChanges();
        }

        opt.view.clear();
        const ref = opt.view.createComponent(this.factory);
        this.tableHeaderInstance = ref.instance as TableheaderComponent;
        ref.changeDetectorRef.detectChanges();
    }


    ngAfterViewInit(): void {

       const colunas = [];
       const checksHeader  = [];
       const switches= [];
       const colunasRef = [];

        const thread :Element[]  = this._elementRef.nativeElement
            .getElementsByTagName("THEAD");
        if (thread && thread.length > 0) {
            const tr :NodeListOf<Element>  = thread[0].getElementsByTagName("TR");
            if (tr && tr.length > 0) {
                const th :NodeListOf<Element>  = tr[0].getElementsByTagName('TH');

                if (th && th.length > 0) {

                    for (let i=0; i < th.length; i++) {
                        const el = th[i].getElementsByTagName("SPAN");

                        if (el[1]) {
                            const elref = new ElementRef(el[1]);
                            const coluna :string =  elref.nativeElement.innerText;

                            colunas.push(coluna);
                            checksHeader[coluna] = true;
                            colunasRef[coluna] = [new ElementRef(th[i])];
                            switches.push(
                                coluna +
                                ': <label class="switch">\n' +
                                '      <input type="checkbox" id="jhiTableheader-' + switches.length + '">\n' +
                                '           <span class="slider round"></span>\n' +
                                '  </label>');
                        }
                    }

                    this.importCampos(colunas, colunasRef);

                    if (! isNullOrUndefined(this.tableHeaderInstance)) {
                        this.tableHeaderInstance.createSwitches(this.opt.entidade, colunas, colunasRef);
                    }

                }
            }
        }
    }


    private importCampos(colunas, colunasRef) {
        const trs :NodeListOf<Element>  =
            this._elementRef
                .nativeElement.getElementsByTagName("TR");

        for(let i =0; i<trs.length; i++) {

            if(trs[i]) {
                const tds :NodeListOf<Element>  = trs[i].getElementsByTagName('TD');
                if (tds && tds.length > 0) {
                    colunas.forEach((v, i) => {
                        colunasRef[v].push(new ElementRef(tds[i]));
                    });
                }
            }
        }
    }

    constructor(
        private _elementRef: ElementRef,
        private eventManager: JhiEventManager,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}


}
