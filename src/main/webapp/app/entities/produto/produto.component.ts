import {Component, OnInit, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import {isNullOrUndefined} from "util";
import { Produto } from './produto.model';
import { ProdutoService } from './produto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import {PreferenciasService} from "../preferencias.service";

@Component({
    selector: 'jhi-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit, OnDestroy {


    @ViewChild('tableH', {read: ViewContainerRef}) tableHeader;
    public modoTabela = false;
    private produtos: Produto[];
    private hides :boolean[] = [];
    private modoProd :boolean[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private produtoService: ProdutoService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal,
        private preferenciaService :PreferenciasService
    ) {
        this.produtos = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.produtoService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.preferenciaService.getPref('pt').subscribe(
            (pref: string) => this.modoTabela = (!isNullOrUndefined(pref) && pref.endsWith('T'))
        );
    }
    reset() {
        this.page = 0;
        this.produtos = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Produto) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInProdutos() {
        this.eventSubscriber = this.eventManager.subscribe('produtoListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.produtos.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    setModoTabela() {
        this.modoTabela = !this.modoTabela;
        this.preferenciaService.setPreferencia('pt', (this.modoTabela ? 'T' : 'F'));
        if (!this.modoTabela) {
            if (!isNullOrUndefined(this.tableHeader)) {
                this.tableHeader.clear();
            }
            this.updateView();
        }
    }

    private updateView() {
        this.produtos.forEach((p) => {
            this.preferenciaService.isProdutoVisivel(p.id).subscribe(
                (ref :any) => {
                    this.hides[ref.id] = ref.visivel;
                    console.log(ref);
                }
            );
        });
    }

    hideProduto(produto: Produto, hide :boolean) {
        this.preferenciaService.storeProdPref(produto.id, hide);
        this.hides[produto.id] = hide;
    }

    salvarProduto(produto :Produto) {
        this.produtoService.update(produto).subscribe();
    }
}
