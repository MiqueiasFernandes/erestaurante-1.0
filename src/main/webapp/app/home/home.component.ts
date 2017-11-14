import {AfterViewChecked, AfterViewInit, Component, OnInit, ApplicationRef} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiDataUtils, JhiAlertService} from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {AutologinService} from "../shared/login/autologin.service";
import {CardapioService} from "../entities/cardapio/cardapio.service";
import {Cardapio, Dia} from "../entities/cardapio/cardapio.model";
import {Produto} from "../entities/produto/produto.model";
import {isNullOrUndefined} from "util";
import {VariaveisService} from "../shared/utils/variaveis.service";
import {SelectComponent} from "../entities/mesa/select/select.component";
import {Mesa} from "../entities/mesa/mesa.model";
import {Venda, VendaStatus} from "../entities/venda/venda.model";
import {ComandaService} from "../entities/comanda/comanda.service";
import {Comanda, Status} from "../entities/comanda/comanda.model";
import {VendaService} from "../entities/venda/venda.service";
import {NotifyService} from "../entities/notify.service";
import { Router } from '@angular/router';

import {ColaboradorService} from "../entities/colaborador/colaborador.service";
import {CargoTipo} from "../entities/cargo/cargo.model";
import {ProdutoService} from "../entities/produto/produto.service";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit, AfterViewInit{
    account: Account;
    modalRef: NgbModalRef;
    modoCardapio :boolean = true;
    dia :Dia;
    cardapio :Cardapio;
    // hoje :Dia = Cardapio.getDia(new Date().getDay());
    status = 1;
    isOpen = false;
    opcionais :string[][]= [];
    adicionais :string[][]= [];
    quantidades = [];
    produtosPedidos = [];
    comanda = false;
    compras :string[]= [];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private autoLoginService :AutologinService,
        private cardapioService :CardapioService,
        private dataUtils: JhiDataUtils,
        private variaveis: VariaveisService,
        private modalService: NgbModal,
        private comandaService: ComandaService,
        private jhiAlertService: JhiAlertService,
        private vendaService: VendaService,
        private notifyService: NotifyService,
        private appref :ApplicationRef,
        private colaboradorService :ColaboradorService,
        private router: Router,
        private produtoService: ProdutoService
    ) {
        this.dia = this.variaveis.getCardapioDay();
    }

    ngAfterViewInit(): void {
        if(!this.account && (!this.modoCardapio || !this.cardapio)){
            this.autoLoginService.isAutoLogin().then((is) => {
                this.modoCardapio = is;
                if(this.modoCardapio) {
                    this.montaCardapio(this.dia);
                    this.status = 3;
                } else {
                    this.status = 2;
                }
            });
        }
    }

    ngOnInit() {

        this.dia = this.variaveis.getCardapioDay();

        this.principal.identity().then((account) => {
            this.tratarAccount(account);
        });

        this.registerAuthenticationSuccess();

        this.variaveis.cardapioObserver$.subscribe((dia) => {
            this.montaCardapio(this.dia = dia);
        });

        setTimeout(()=>{
            if (!this.account) {
                this.autoLoginService.autoLogin(true);
            }
        }, 3000);

    }

    tratarAccount(account) {
        this.account = account;
        if (this.autoLoginService.accountIsAutologin(account)) {
            this.status = 3;
        } else {
            this.status = 2;
            this.direcionar();
        }
        this.notifyService.subscribe();
        this.notifyService.receive()
            .subscribe((data: {entidade :string, id :number, message :string}) => {
                if (
                    !isNullOrUndefined(data.entidade) &&
                    !isNullOrUndefined(data.message) &&
                    (data.entidade.startsWith('venda') && (this.compras.indexOf(data.id.toString()) >= 0))  ||
                    data.entidade.startsWith('comanda')
                ) {
                    this.variaveis.update();
                    this.comanda = true;
                    if (data.message.startsWith('produzindo')) {
                        this.vendaService.find(data.id).toPromise().then(v => {
                            alert('Seu produto ' + (v.produto as Produto).nome + ' esta chegando!');
                            this.appref.tick();
                        });
                    } else if (data.message.startsWith('entregue')) {
                        this.vendaService.find(data.id).toPromise().then(v => {
                            alert('Seu produto ' + (v.produto as Produto).nome + ' esta pronto!');
                            this.produtosPedidos[v.produto.id] = false;
                            this.appref.tick();
                        });
                    }
                    this.appref.tick();
                    // this.compras = this.compras.filter(c => data.id.toString().match(c));
                }
            });
    }

    registerAuthenticationSuccess() {

        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.tratarAccount(account);
            });
        });

        this.eventManager.subscribe('autologin', (message) => {
            this.modoCardapio = (message && message.content && message.content.startsWith('true'));
            this.montaCardapio(this.dia);
            this.status = 3;
        });

    }

    direcionar() {
        console.clear();
        console.log('direcionando');
        this.colaboradorService.getCurrentColaborador().subscribe(
            (colaborador) => {
                switch (colaborador.getMaxCargo()) {
                    case CargoTipo.GERENCIA:
                        this.router.navigate(['menugerencial/']);
                        break;
                    case CargoTipo.CAIXA:
                        this.router.navigate(['comanda/']);
                        break;
                    case CargoTipo.ATENDIMENTO:
                        this.router.navigate(['venda/']);
                        break;
                    case CargoTipo.PRODUCAO:
                        this.router.navigate(['venda/']);
                        break;
                }
            }
        );
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    montaCardapio( day :Dia) :void {
        this.cardapioService.getCardapioOfDay(this.dia = day).subscribe(
            (c :Cardapio) => {
                this.cardapioService.find(c.id).subscribe((cardapio) => {
                    if (!isNullOrUndefined(cardapio) &&
                        !isNullOrUndefined(cardapio.produtos) &&
                        cardapio.produtos.length > 0) {
                        const prods = [];
                        cardapio.produtos.forEach((produto) => {
                            prods.push(produto.id);
                            this.quantidades[produto.id] = 1;
                        });
                        cardapio.produtos = [];
                        prods.forEach(id => this.produtoService.find(id).subscribe(p => cardapio.produtos.push(p)));
                        this.cardapio = cardapio;
                    } else {
                        this.cardapio = null;
                    }
                });
            }
        );
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    getDia() {
        return Cardapio.diaToString(Cardapio.getDia(this.dia));
    }

    comprar(produto :Produto) {
        if (this.variaveis.hasMesa()) {
            this.variaveis.getMesa().subscribe((mesa) => this.efetuarPedido(mesa, produto));
        } else {
            this.open().result.then((mesa) => this.efetuarPedido(mesa, produto));
        }
    }

    efetuarPedido(mesa :Mesa, produto :Produto) {
        if (!isNullOrUndefined(mesa) && !isNullOrUndefined(produto)) {
            this.variaveis.getComanda().toPromise().then((comanda) => {
                this.sendPedido(produto, comanda);
                this.comanda = true;
            }).catch(() => {
                this.comandaService.getComandaAvulsa(mesa.id).subscribe((comanda) => {
                    comanda.status = Status.ABERTA;
                    this.sendPedido(produto, comanda);
                });
            });
        }
    }

    sendPedido(produto :Produto, comanda :Comanda) {

        if (!(Comanda.tipoEquals(comanda.status, Status.ABERTA) || Comanda.tipoEquals(comanda.status, Status.VAZIA))) {
            alert('Erro! Sua comanda está fechada, contate o garçon!');
        }

        let produtoCopy :Produto=Object.assign({}, produto);
        let pedido :Venda = new Venda;
        pedido.comanda = comanda;
        pedido.quantidade = this.quantidades[produto.id];
        pedido.status =VendaStatus.PEDIDO;
        ///data vai ser add no java
        pedido.data = '10/10/2010 10:10';
        ////alterar opc e adicional de produto
        ///teste

        if (this.opcionais[produto.id]){
            this.opcionais[produto.id].map(opt => parseFloat(opt.replace(/.*\$/, ''))).forEach(p => pedido.valorizacao += p);
        }
        if (this.adicionais[produto.id]) {
            this.adicionais[produto.id].map(opt => parseFloat(opt.replace(/.*\$/, ''))).forEach(p => pedido.valorizacao += p);
        }
        pedido.produto = produtoCopy;

        this.vendaService.create(pedido).toPromise().then((pedido)=>{
            this.quantidades[pedido.produto.id] = 0;
            this.notifyService.sendMessage('venda', 'added', pedido.id);
            this.produtosPedidos[pedido.produto.id] = true;
            this.compras.push(pedido.id.toString());
        }).catch(()=>{
            alert('Houve uma falha ao tentar fazer a venda! comunique o garçon.')
        });

    }

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(SelectComponent, {
            container: 'nav'
        });
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }


    getProdutoArr(produto :Produto, adicionais :boolean) :string[]{
        if (adicionais && !isNullOrUndefined(produto.adicional) && produto.adicional.length > 0) {
            return produto.adicional.split(',');
        }
        if (!adicionais && !isNullOrUndefined(produto.opcional) && produto.opcional.length > 0) {
            return produto.opcional.split(',');
        }
        return [];
    }

    setOpc(checked, produto, modo, opc) {

        const vet = modo ? this.opcionais : this.adicionais;

        if (!vet[produto.id]) {
            vet[produto.id] = [];
        }

        if (checked) {
            vet[produto.id].push(opc);
        } else {
            vet[produto.id] = vet[produto.id].filter(opt => opt !== opc);
        }

        console.log(vet);

    }



}
