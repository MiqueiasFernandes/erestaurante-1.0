import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImpressoraPopupService} from "../impressora-popup.service";
import {ActivatedRoute} from "@angular/router";
import {Impressora} from "../impressora.model";
import {ImpressoraService} from "../impressora.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'jhi-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    impressora :Impressora;
    impressoras :Impressora[]=[];

    imprimindo = [];


    // script :{
    //     id:number,
    //     texto: boolean,
    //     request: string,
    //     target: string,
    //     arquivo: string,
    //     comanda?: number,
    //     status: number
    // };


    constructor(
        public activeModal: NgbActiveModal,
        private impressoraService: ImpressoraService,
        private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.impressora.script =  this.impressora.script.data[0];
        this.impressoras.push(this.impressora);
    }

    close() {
        this.activeModal.dismiss('cancel');
    }

    sanitized(script) {
        return this.sanitizer.bypassSecurityTrustHtml(script.arquivo);
    }

    addPrinter(id, data) {
        console.log('add printer ' + id + ' ' + data);
        this.impressoraService.find(id).subscribe(
            (impressora :Impressora) => {
                try {
                    impressora.script = JSON.parse(impressora.script).data.find(dt => dt.id === data);
                    this.impressoras.push(impressora);
                } catch (e){
                    alert('Impossivel interpretar os dados! tente novamente');
                    this.close();
                    console.error(e);
                }
            }
        );
    }

    remove(imp) {
        this.impressoras = this.impressoras.filter(i => i.id !== imp.id);
        this.impressoraService.find(imp.id).subscribe(
            (impressora :Impressora) => {
                try {
                    const data = JSON.parse(impressora.script).data.filter(dt => dt.id !== imp.script.id);
                    impressora.script = JSON.stringify({data: data});
                    this.impressoraService.update(impressora).subscribe(() => {
                        if (this.impressoras.length < 1) {
                            this.close();
                        }
                    });
                } catch (e){
                    console.error(e);
                }
            }
        );
    }

    addObservacao(printer: Impressora){
        const obs = prompt('Digite a observação a inserir:', 'favor embalar para entregar');
        if (obs && obs.length > 0){
            printer.script.arquivo = printer.script.arquivo.replace('{{OBSERVACAO}}', obs);
            printer.script.observavel = false;
        }
    }

    cancelar() {
        this.impressoras.forEach(i => this.remove(i));
    }

    imprimir() {
        this.impressoras.forEach((i, k) => {
            this.imprimindo[i.id] = true;
            this.impressoraService.find(i.id).subscribe(
                (imp) => {
                    const id_impressao = i.script.id;
                    i.script.status = 2;
                    const data = JSON.parse(imp.script)
                        .data.filter(dt => dt.id !== i.script.id);
                    data.push(i.script);
                    imp.script = JSON.stringify({data: data});
                    this.impressoraService.update(imp).subscribe((impressora :Impressora) => {
                        impressora.script = JSON.parse(impressora.script);
                        if (impressora.script.data.find(p => p.id === id_impressao).status > 2) {
                            impressora.script.data = impressora.script.data.filter(p => p.id !== id_impressao);
                        } else {
                            alert('Houve um erro, o documento ficará guardado \n no pool de '+impressora.nome+' para tentativa posterior');
                            impressora.script.data.find(p => p.id === id_impressao).status = 0;
                        }
                        impressora.script = JSON.stringify(impressora.script);
                        this.impressoraService.update(impressora).subscribe((nimp) => {
                            this.impressoras = this.impressoras.filter(i => i.id !== nimp.id);
                            if(this.impressoras.length < 1) {
                                this.close();
                            }
                        });
                    });
                }
            );
        });
    }

}


@Component({
    selector: 'jhi-impressora-preview-popup',
    template: ''
})
export class ImpressoraPreviewPopupComponent implements OnInit, OnDestroy  {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private impressoraPopupService: ImpressoraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            const id = params['id'];
            let data = params['data'];
            if (data && data.endsWith('A')) {
                data = data.replace('A', '');
                this.impressoraPopupService.getngbModalRef()
                    .then(pv => pv.addPrinter(id, data))
                    .catch(err => console.error(err));
            } else {
                this.impressoraPopupService
                    .open(PreviewComponent as Component, id, data);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}


//////TESTEMUNHA
///24 C em tam DEFAULT
///48 C em tam 80%
///16 C 15px
///19 C 13px
///20 C 12px
///24 C 10px
///30 C 8px
///40 C 6px
///WIDTH 155px | 33% (595!)

// '' +
// '<pre>------------------------</pre>DF<br>' +
// '<pre>123456789012345678901234</pre>DF<br>' +
// '<div style="border-bottom: 3px solid black; width: 155px">155</div>' +
// '50%<br> ' +
// '<pre style="font-size: 50%">123456789012345678901234</pre><br>' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<pre style="font-size: 60%">123456789012345678901234</pre><br>' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<pre style="font-size: 70%">123456789012345678901234</pre><br>' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<pre style="font-size: 80%">123456789012345678901234</pre><br>' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<pre style="font-size: 90%">123456789012345678901234</pre><br>' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<pre style="font-size: 100%">123456789012345678901234</pre><br>' +
// '100%<br> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '' +
// '50%<br> ' +
// '<div style="font-size: 50%">123456789012345678901234</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 60%">123456789012345678901234</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 70%">123456789012345678901234</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 80%">123456789012345678901234</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 90%">123456789012345678901234</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 100%">123456789012345678901234</div> ' +
// '100%<br> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '' +
// '<div style="font-size: 6px">123456789012345678901236</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 8px">123456789012345678901238</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 10px">123456789012345678901210</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 12px">123456789012345678901212</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 13px">123456789012345678901213</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<div style="font-size: 15px">123456789012345678901215</div> ' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '' +
// '<div style="border-bottom: 3px solid black; width: 155px"></div> ' +
// '<br>' +
// '<pre>' +data+  '</pre>' +
// '' +
// data+
// '' +
// '' +
// '' +
// '' +
// '<hr>'
