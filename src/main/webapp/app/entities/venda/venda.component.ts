import {Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ApplicationRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import {Venda, VendaStatus} from './venda.model';
import { VendaService } from './venda.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import {NotifyService} from "../notify.service";
import {isNullOrUndefined} from "util";
import {ColaboradorService} from "../colaborador/colaborador.service";
import {Cargo, CargoTipo} from '../cargo/cargo.model';
import {Produto} from "../produto/produto.model";
import {Mesa} from "../mesa/mesa.model";
import {MesaService} from "../mesa/mesa.service";
import {ComandaService} from "../comanda/comanda.service";
import {ProdutoService} from "../produto/produto.service";
import {Comanda, Status} from "../comanda/comanda.model";
import {Colaborador} from "../colaborador/colaborador.model";
import {ClienteService} from "../cliente/cliente.service";
import {Observable} from "rxjs/Observable";
import {Cliente} from "../cliente/cliente.model";


@Component({
    selector: 'jhi-venda',
    templateUrl: './venda.component.html',
    styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit, OnDestroy {

    @ViewChild('tableH', {read: ViewContainerRef}) tableHeader;
    vendas: Venda[];
    mesas: Mesa[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    tipo :Modo = Modo.ADMIN;
    colaborador :Colaborador;
    novaComanda :Comanda[] = [];

    constructor(
        private vendaService: VendaService,
        private colaboradorService: ColaboradorService,
        private comandaService :ComandaService,
        private clienteServer :ClienteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal,
        private entityNotify: NotifyService,
        private appref :ApplicationRef
    ) {
        this.vendas = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.vendaService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    addVenda(venda :Venda) {
        this.comandaService.find(venda.comanda.id).toPromise().then((c) => {
            venda.comanda = c;
            if (this.tipo !== Modo.GARCON ||
                c.mesas.some(m => (m as Mesa).descricao.indexOf(this.colaborador.id.toFixed())>=0)) {
                if (!this.vendas.some(v => v.id === venda.id)) {
                    this.vendas.push(venda);
                }
            }
            this.appref.tick();
        });
    }


    reset() {
        this.page = 0;
        this.vendas = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnInit() {
        // this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;

            this.entityNotify.subscribe();
            this.entityNotify.receive()
                .subscribe((data: {entidade :string, id :number, message :string}) => {
                    if (
                        !isNullOrUndefined(data.entidade) &&
                        !isNullOrUndefined(data.message) &&
                        data.entidade.startsWith('venda') &&
                        ( (this.tipo === Modo.GARCON &&  data.message.startsWith('added')) ||
                            (this.tipo === Modo.PRODUCAO &&  data.message.startsWith('aprovada')))
                    ) {
                        this.vendaService.find(data.id).toPromise().then((v: Venda) => {
                            this.addVenda(v);
                        });
                    }
                });

            this.colaboradorService.getCurrentColaborador().toPromise().then(
                (colaborador) => {
                    this.colaborador = colaborador;
                    if (colaborador.cargos.some(
                            (cargo) => Cargo.tipoEquals(cargo, CargoTipo.ATENDIMENTO))) {
                        this.tipo = Modo.GARCON;
                    } else if (colaborador.cargos.some(
                            (cargo) => Cargo.tipoEquals(cargo, CargoTipo.PRODUCAO)
                        )){
                        this.tipo = Modo.PRODUCAO;
                    } else {
                        this.tipo =Modo.ADMIN;
                    }
                    if (this.tipo !== Modo.ADMIN) {
                        this.tableHeader.clear();
                    }
                    this.loadAll();
                }
            );
        });
        this.registerChangeInVendas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Venda) {
        return item.id;
    }
    registerChangeInVendas() {
        this.eventSubscriber = this.eventManager.subscribe('vendaListModification', (response) => this.reset());
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
            this.vendas.push(data[i]);
        }

        switch (this.tipo) {
            case Modo.ADMIN:
                break;
            case Modo.GARCON:
                this.findVendas(
                    this.vendas.filter(v => Venda.tipoEquals(v, VendaStatus.PEDIDO))
                );
                break;
            case Modo.PRODUCAO:
                this.findVendas(
                    this.vendas.filter(v => Venda.tipoEquals(v, VendaStatus.AUTORIZADO))
                );
                break;
        }

    }

    private findVendas(v2s: Venda[]) {
        this.vendas = [];
        v2s.forEach(venda => {
           this.addVenda(venda);
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    isPedidoAvulco(venda :Venda) {
        return (venda.comanda as Comanda).codigo.startsWith('comanda-de-pedido-avulco');
    }

    getMesa(venda) {
        return venda.comanda ? venda.comanda.mesas ? venda.comanda.mesas.map(m => m.codigo).join(', ') : '' : '';
    }

    getMesaID(venda) {
        return venda.comanda ? venda.comanda.mesas ? venda.comanda.mesas[0] ? venda.comanda.mesas[0].id : -1 : -1 : -1;
    }

    vendaData(venda: Venda) {
        return venda.data ? new Date(venda.data).toISOString()
            .replace('T', ' ')
            .replace('Z', '') : '';
    }

    tipoDeVenda(venda :Venda) {
        if (this.isPedidoAvulco(venda)) {
            return 'Novo Cliente';
        }
        return 'Novo Pedido para ' + ((venda.comanda as Comanda).pagador as Cliente).nome;
    }

    comandaCod(venda) {
        if (this.isPedidoAvulco(venda)) {
            return '---';
        }
        return venda.comanda.codigo;
    }

    rejeitar(venda :Venda) {
        venda.status = VendaStatus.CANCELADO;
        venda.data = this.vendaData(venda);
        this.vendaService.update(venda).subscribe(
            (venda) => {
                this.retiraVenda(venda);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }


    aprovar(venda: Venda) {
        if (this.isPedidoAvulco(venda)) {
            this.clienteServer.getClienteAnonimo().subscribe(cliente => {
                let comanda: Comanda = new Comanda();
                let excomanda = venda.comanda;
                comanda.mesas = [(excomanda as Comanda).mesas[0]];
                comanda.status = Status.ABERTA;
                comanda.codigo = this.gerarCodigo();
                comanda.colaboradores = [this.colaborador];
                comanda.total = ((venda.produto as Produto).preco * venda.quantidade);
                comanda.pagador = cliente;
                comanda.gorjeta = 0;
                venda.comanda = comanda;
                this.storeVenda(venda, excomanda);
            });
        } else {
            (venda.comanda as Comanda).status = Status.ABERTA;
            if (!(venda.comanda as Comanda).colaboradores.some(c => c.id === this.colaborador.id)) {
                (venda.comanda as Comanda).colaboradores.push(this.colaborador);
            }
            this.storeVenda(venda);
        }
    }

    storeVenda(venda: Venda, exComanda?: Comanda) {
        this.comandaService.update(venda.comanda).subscribe(
            (c) => {
                this.entityNotify.sendMessage('comanda', 'alterada', c.id);
                venda.comanda = c;
                venda.status = VendaStatus.AUTORIZADO;
                venda.data = this.vendaData(venda);
                console.log(venda);
                this.vendaService.update(venda).subscribe((v: Venda) => {
                        this.retiraVenda(v);
                        this.entityNotify.sendMessage('venda', 'aprovada', v.id);
                        if (exComanda) {
                            exComanda.status = Status.VAZIA;
                            this.comandaService.update(exComanda).toPromise().then(c => {});
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json));
            },
            (res: ResponseWrapper) => {
                this.comandaService.findByMesa(exComanda.mesas[0].id).subscribe(
                    (comanda) => {
                        this.novaComanda[exComanda.mesas[0].id] = comanda;
                    }
                );
            });
    }

    salvarComoNovaComanda(venda :Venda) {
        venda.comanda = this.novaComanda[(venda.comanda as Comanda).mesas[0].id];
        this.aprovar(venda);
    }

    gerarCodigo() :string{
        return this.colaborador.id + '-' + Date.now();
    }

    retiraVenda(venda :Venda) {
        this.vendas =  this.vendas.filter(v => venda.id !== v.id);
        setTimeout(()=>{this.appref.tick();}, 500);
    }


    notificar() {
        this.vendaService.query()
            .map(res => res.json)
            .subscribe((vendas :Venda[]) => {
                vendas
                    .filter(v => Venda.tipoEquals(v.status, VendaStatus.AUTORIZADO) &&
                        Comanda.tipoEquals(Status.ABERTA, (v.comanda as Comanda).status) ||
                        Comanda.tipoEquals(Status.VAZIA, (v.comanda as Comanda).status))
                    .forEach(v => this.entityNotify.sendMessage('venda', 'aprovada', v.id));
            });
    }

    fazer(venda :Venda) {
        venda.status = VendaStatus.PRODUZINDO;
        venda.data = this.vendaData(venda);
        this.vendaService.update(venda).subscribe((v: Venda) => {
                this.entityNotify.sendMessage('venda', 'produzindo', v.id);
            },
            (res: ResponseWrapper) => this.onError(res.json));
    }

    entregar(venda) {
        venda.status = VendaStatus.ENTREGUE;
        venda.data = this.vendaData(venda);
        this.vendaService.update(venda).subscribe((v: Venda) => {
                this.entityNotify.sendMessage('venda', 'entregue', v.id);
                this.retiraVenda(v);
            },
            (res: ResponseWrapper) => this.onError(res.json));
    }

    podeFazer(venda) :boolean{
        return Venda.tipoEquals(venda.status, VendaStatus.PRODUZINDO);
    }
    podeEntregar(venda) :boolean{
        return !Venda.tipoEquals(venda.status, VendaStatus.PRODUZINDO);
    }

}

export const enum Modo {
    'GARCON',
    'PRODUCAO',
    'ADMIN'
}
