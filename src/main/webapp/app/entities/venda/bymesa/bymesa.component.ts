import { Component, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import {MesaService} from "../../mesa/mesa.service";
import {Mesa} from "../../mesa/mesa.model";
import {Produto} from "../../produto/produto.model";
import {ProdutoService} from "../../produto/produto.service";
import {DomSanitizer} from '@angular/platform-browser';
import {Venda, VendaStatus} from "../venda.model";
import {Comanda, Status} from "../../comanda/comanda.model";
import {ComandaService} from "../../comanda/comanda.service";
import {VendaService} from "../venda.service";
import {ClienteService} from "../../cliente/cliente.service";
import {Colaborador} from "../../colaborador/colaborador.model";
import {ColaboradorService} from "../../colaborador/colaborador.service";
import {Cargo, CargoTipo} from "../../cargo/cargo.model";
import {Cliente} from "../../cliente/cliente.model";
import {JhiEventManager} from "ng-jhipster";
import {PreferenciasService} from "../../preferencias.service";
import {Cardapio} from "../../cardapio/cardapio.model";
import {ImpressoraService} from "../../impressora/impressora.service";
import {Impressora} from "../../impressora/impressora.model";
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {RestauranteService} from "../../restaurante/restaurante.service";
import {Restaurante} from "../../restaurante/restaurante.model";
import {Endereco} from "../../endereco/endereco.model";
import {UnidadePipe} from "../../../shared/utils/unidadePipe.pipe";

@Component({
    selector: 'jhi-bymesa',
    templateUrl: './bymesa.component.html',
    styleUrls: ['./bymesa.component.scss', '../../../layouts/tableheader/tableheader.component.scss'],
    providers: [CurrencyPipe, DecimalPipe, UnidadePipe]
})
export class BymesaComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    mesa: Mesa;
    status :number = 1;
    key = '';
    pesquisa = [];
    produtos :Produto[];
    marcar = [];
    vendas: Venda[];
    vendA: Venda;
    comanda: Comanda;
    colaborador :Colaborador;
    linha = -1;
    garcons :Colaborador[] = [];
    clientes :Cliente[] = [];
    eventSubscriber: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private mesaService: MesaService,
        private comandaService: ComandaService,
        private clienteService: ClienteService,
        private colaboradorService: ColaboradorService,
        private vendaService: VendaService,
        private produtoService :ProdutoService,
        private sanitizer: DomSanitizer,
        private preferenciaService :PreferenciasService,
        private eventManager: JhiEventManager,
        private impressoraService: ImpressoraService,
        private restauranteService: RestauranteService,
        private cp: CurrencyPipe,
        private cn: DecimalPipe,
        private up: UnidadePipe
    ) {

        this.pesquisa.push('nome');
        this.pesquisa.push('preco');
        this.pesquisa.push('categoria');
        this.pesquisa.push('estoque');
        this.pesquisa.push('codigo');
        this.pesquisa.push('unidade');

    }

    ngOnInit() {

        this.eventSubscriber =
            this.eventManager.subscribe('comandaListModification',
                (response) => {
                    this.load(this.mesa.id);
                    this.produtos.forEach(p => {
                        this.produtoService.find(p.id).subscribe(q => {
                            p.estoque = q.estoque;
                        });
                    });
                });


        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });

        this.produtoService.queryFromCategoria('categoria', 'popular').subscribe(
            (res) => this.loadProdutos(res)
        );

        this.colaboradorService.getCurrentColaborador().toPromise().then(
            (colaborador) => {
                this.colaborador = colaborador;
                this.preferenciaService.getPref('pesquisa').subscribe(
                    (pref: string) => {
                        if (pref && pref.length > 1) {
                            this.pesquisa = pref.split('-');
                        }
                    }
                );
            }
        );

        this.colaboradorService
            .getColaboradorByCargo(CargoTipo.ATENDIMENTO)
            .subscribe(
                (res) => {
                    this.garcons = res;
                }
            );

        this.clienteService.query().subscribe(
            res => this.clientes = res.json
        );
    }


    loadProdutos(prods) {
        this.produtos = prods;
        this.produtos.forEach(p => this.marcar[p.id] = false);
    }

    loadVendas() {
        this.vendA = undefined;
        this.linha = -1;
        if (this.comanda) {
            this.vendas = [];
            this.vendaService.getVendasForComandaId(this.comanda.id).subscribe(vendas => this.vendas = vendas);
        }
    }

    loadComanda() {
        this.vendA = undefined;
        this.linha = -1;
        this.comandaService.findByMesa(this.mesa.id).subscribe(
            (comanda) => {
                this.comanda = comanda;
                this.status = 2;
                this.loadVendas();
            },
            () => {
                this.comanda = undefined;
                this.vendas = [];
                this.setMesaProp({garcon: null, pessoas: 0, time: null})
            }
        );
    }

    load(id) {
        this.mesaService.find(id).subscribe((mesa) => {
            this.mesa = mesa;
            this.loadComanda();
        });

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    getStatus(){
        return this.status === 1 ? 'desocupada' : 'ocupada';
    }

    getStatusColor(){

        if (this.status === 1) {
            return 'grey';
        }

        if (this.comanda && Comanda.isFechada(this.comanda)) {
            return 'green';
        }

        if (this.vendas && this.vendas.some(v => Venda.tipoEquals(v.status, VendaStatus.PEDIDO))) {
            return 'red';
        }

        return 'blue';
    }

    getMesaProp() :any {
        return (/\{.*\}/g.test(this.mesa.descricao)) ? JSON.parse(this.mesa.descricao) : {};
    }

    setMesaProp(data){
        this.mesa.descricao = JSON
            .stringify(Object.assign(this.getMesaProp(), data));
        this.updateMesa(this.mesa);
    }

    getGarcon() {
        const prop = this.getMesaProp();
        return prop.garcon ? (prop.garcon.id + ' - ' + prop.garcon.nome) : 'Definir garçon';
    }

    setGarcon(garcon :Colaborador) {
        this.setMesaProp({garcon : {id: garcon.id, nome: garcon.nome, user: garcon.usuario.login}});
    }

    getCliente() {
        return this.comanda && this.comanda.pagador ?
            (this.comanda.pagador.id + ' - ' + (this.comanda.pagador as Cliente).nome) : 'Definir cliente';
    }

    setCliente(cliente: Cliente) {
        if (this.comanda) {
            this.comanda.pagador = cliente;
            this.updateComanda(this.comanda);
        }
    }

    updateComanda(comanda) {
        this.comandaService.update(comanda).subscribe(c => this.comanda = c);
    }


    getPessoas(){
        return this.getMesaProp().pessoas || 0;
    }

    select(key) {
        this.key = key;
        this.pesquisar(true);
    }

    addPessoas() {
        this.setPessoas(this.getPessoas() + 1);
    }

    rmPessoas() {
        const num = this.getPessoas()-1;
        if (num >= 0) {
            this.setPessoas(num);
        }
    }

    setPessoas(num) {
        this.setMesaProp({pessoas: num});
    }

    updateMesa(mesa) {
        this.mesaService.update(mesa).subscribe(m => this.mesa = m);
    }

    sanitize(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    stop($event, produto){
        event.stopPropagation();
        this.vendA = this.vendas.find(v => v.produto.id === produto.id);
    }


    trackId(index: number, item: Venda) {
        return item.id;
    }

    criar() {
        if (this.colaborador) {
            this.clienteService.getClienteAnonimo().subscribe(cliente => {
                let comanda: Comanda = new Comanda();
                comanda.mesas = [this.mesa];
                comanda.status = Status.ABERTA;
                comanda.codigo = this.gerarCodigo();
                comanda.colaboradores = [this.colaborador];
                comanda.total = 0;
                comanda.pagador = cliente;
                comanda.gorjeta = 0;
                this.comandaService.create(comanda).subscribe(c => {
                    this.comanda = c;
                    this.setMesaProp({pessoas: 1, time: new Date().getTime()})
                });
            });
        }else {
            alert('Error não há colaborador!');
        }
    }

    comprar(produto: Produto) {

        if (this.comanda) {
            // this.produtos.forEach((p) => {
            // if (this.marcar[p.id]) {
            const venda : Venda = new Venda;
            venda.comanda = this.comanda;
            venda.data = '12/12/2012 14:45';
            venda.status = VendaStatus.ENTREGUE;
            venda.produto = produto;
            venda.quantidade = 1;
            this.vendaService.create(venda).subscribe(v =>  {
                this.loadComanda();
            });
            // }
            // });
            // this.produtos.forEach(p => this.marcar[p.id] = false);
        }
    }


    gerarCodigo() :string{
        return this.colaborador.id + '-' + Date.now();
    }

    salvarVenda() {
        if (this.vendA) {
            this.vendA.status = VendaStatus.ENTREGUE;
            this.vendA.data = this.vendaData(this.vendA);
            this.vendaService.update(this.vendA).subscribe(() => this.loadComanda());
        }
    }

    vendaData(venda: Venda) {
        return venda.data ? new Date(venda.data).toISOString()
            .replace('T', ' ')
            .replace('Z', '') : '';
    }


    toogle(str, checked) {
        if (checked) {
            this.pesquisa.push(str);
        } else {
            this.pesquisa = this.pesquisa.filter( p => !p.match(str));
        }
        this.setChecks();
    }

    pesquisar(base :boolean) {
        this.produtoService.queryFromCategoria(

            (base ? this.key : this.pesquisa.join(',')  ) ,  this.key

        ).subscribe(ps => this.produtos = ps);
    }

    remover(venda : Venda) {
        this.vendaService.delete(venda.id).subscribe(() => this.loadComanda());
    }

    setChecks() {
        this.preferenciaService.setPreferencia('pesquisa', this.pesquisa.join('-'));
    }




    notificar() {
        const prop = this.getMesaProp();
        if (prop && prop.garcon && prop.garcon.user) {
            if (this.comanda && this.comanda.pagador) {
                const garcon = prop.garcon.user;
                const cliente = (this.comanda.pagador as Cliente).nome;
                const mesa = this.mesa.local;
                const dt = new Date();

                const id :string = dt.getTime().toString();

                const data =
                    dt.toLocaleString().replace(/:\d+$/, ' ')
                    + Cardapio.getDiasStringSimples()[dt.getDay()];

                const seq = this.comanda.codigo.split('-')[2];

                let imps :string[] = [];
                let contents :string[] = [];

                this.vendas.map( v=> (v.produto as Produto).observacao).forEach(imp => {
                    if (imps.indexOf(imp) < 0) {
                        imps.push(imp);
                    }
                });

                const qtd = imps.length;

                imps.forEach((imp, index) => {

                    const vdas = this.vendas.filter(v => (v.produto as Produto).observacao === imp);

                    let template = '<div style="width: 155px; font-family: mono, Courier New; font-size: 6px; margin-top: 10px">' +
                        '<table style="width: 100%; border: none;line-height: 4px; padding: 0px 3px;">' +
                        '<tr style="font-weight: bold; font-size: 12px;">' +
                        '<td>'+'MESA ' + mesa + '</td>' +
                        '<td style="text-align: right;">' + (index+1) +'/' + qtd +'</td>' +
                        '</tr>' +
                        '' +
                        '<tr><td colspan="2" style="text-align: center"><i style="font-size: 10px">' + data + '</i></td></tr>' +
                        '' +
                        '<tr style="font-size: 8px">' +
                        '<td>'+ '<b style="font-size: 6px">OPERADOR:</b><br> '+this.colaborador.usuario.login +'</td>' +
                        '<td style="text-align: right">'+ '<b style="font-size: 6px">GARÇON:</b><br> '+garcon +'</td>' +
                        '</tr>' +
                        '' +
                        '<tr style="font-size: 8px">' +
                        '<td>'+'<b style="font-size: 6px">CLIENTE:</b><br> '+cliente + '</td>' +
                        '<td style="text-align: right">'+  '<b style="font-size: 6px">LOCAL:</b><br> '+imp +'</td>' +
                        '</tr>' +
                        '' +
                        '<tr style="font-size: 8px">' +
                        '<td>'+ '<b style="font-size: 6px">PESSOAS:</b><br> '+this.getPessoas() +'</td>' +
                        '<td style="text-align: right">'+ '<b style="font-size: 6px">COMANDA:</b><br> '+this.comanda.id + '<b>' + index +'</b>'+'</td>' +
                        '</tr>' +
                        '' +
                        '' +
                        '<tr style="font-size: 8px">' +
                        '<td>'+'<b style="font-size: 6px">PDV:</b><br> ' +  (vdas.some((v) => !v.isEntregue()) ? 'GARCON' : 'PAINEL') + '</td>' +
                        '<td style="text-align: right"> <b style="font-size: 6px">SEQ:</b><br>' + seq + '</td>' +
                        '</tr>' +
                        '' +
                        '' +
                        '' +
                        '</table>' +
                        // '<div style="text-align: center"><i style="font-size: small">' + data +'</i></div>'+
                        // '<b style="font-size: xx-small">OPERADOR:</b> '+this.colaborador.usuario.login +'<br>'+
                        // '<b style="font-size: xx-small">GARÇON:</b> '+garcon +'<br>'+
                        // '<b style="font-size: xx-small">CLIENTE:</b> '+cliente +'<br>'+
                        // '<b style="font-size: xx-small">LOCAL:</b> '+imp +'<br>'+
                        // '<b style="font-size: xx-small">PESSOAS:</b> '+this.getPessoas() +'<br>'+
                        // '<b style="font-size: xx-small">COMANDA:</b> '+seq + '<b>' + index +'</b><br>'+
                        // '<b style="font-size: xx-small">PDV:</b> ' +  (vdas.some((v) => !v.isEntregue()) ? 'GARCON' : 'PAINEL') +
                        '<hr><br>';

                    vdas.forEach(vda => {
                        template += '<b style="font-size: 12px;"> ' + (

                            ( (Produto.isDecimal(vda.produto) ? this.getTransform(vda.quantidade) : vda.quantidade)+ '' + this.up.transform(vda.produto as Produto))

                            + '&nbsp;' +
                            ' ' + (vda.produto as Produto).nome.toUpperCase() +'</b><br>');
                    });

                    template +=  '<br><hr>' + '<p style="text-align: center; font-size: 10px"><b><i>E-RESTAURANTE</i></b></p></div>' +
                        '' +
                        '<br>' +
                        '{{OBSERVACAO}}'+
                        '<br>' +
                        '' +
                        '<pre style="font-weight: bold">'+id+'</pre>';

                    contents.push(template);
                });

                this.impressoraService.query().subscribe((rw) => {
                    const impressoras : Impressora[] = rw.json;

                    imps.forEach((imp, k) => {
                        const hab =  impressoras.filter(i => i.local.indexOf(imp) >= 0);

                        if (hab && hab.length > 0) {
                            const impressora = hab.sort((a, b) => b.prioridade - a.prioridade)[0];
                            if (impressora) {
                                this.preview(impressora, {
                                    id: id,
                                    texto: true,
                                    request: data,
                                    target: imp,
                                    arquivo: contents[k],
                                    comanda: this.comanda.id,
                                    status: 1,
                                    observavel: true,
                                    sequenciavel: 1
                                }, (id + (k > 0 ? 'A': '')));
                            } else {
                                alert('ERRO! Não foi encontrada impressora para imprimir em ' + imp);
                            }
                        } else {
                            alert('ERRO! Adicione impressora para imprimir em ' + imp);
                        }
                    });
                });
            } else {
                alert('Selecione um cliente para esta comanda!');
            }
        } else {
            alert('Selecione um garçon para esta comanda primeiro!');
        }
    }


    getTransform(numero):string {
        return this.cn.transform(numero, '1.2-2');
    }


    preconta() {

        this.comanda.gorjeta = (this.comanda.total*0.1);

        this.comandaService.update(this.comanda).subscribe((comandaComEncargo :Comanda) => {

            this.comanda = comandaComEncargo;

            this.restauranteService.query()

                .map(res => res.json[0])

                .subscribe(
                    (restaurante: Restaurante) => {


                        const endereco = restaurante.endereco as Endereco;

                        const detalhes = endereco.logradouro + ' ' + endereco.local + ', ' + endereco.numero + '<br>' +
                            endereco.cidade + '-' + endereco.estado + ' ' + restaurante.telefone;


                        const dt = new Date();

                        const id: string = dt.getTime().toString();

                        const data =
                            dt.toLocaleString().replace(/:\d+$/, '').replace('/20', '/')
                            + ' ' + Cardapio.getDiasStringSimples()[dt.getDay()];

                        const template =


                            '<div style="width: 155px; font-family: mono, Courier New; font-size: 6px; margin-top: 10px">' +

                            '<div style="text-align: center; font-size: 10px"><b>'+restaurante.nomeFantasia+'</b></div>' +

                            '<div style="text-align: center; font-size: 5px">' +

                            detalhes +
                            '</div>' +

                            '<table style="border: none; width: 100%; line-height: 4px">' +
                            '' +
                            '<tr>' +
                            '<td colspan="2" style="text-align: center">' + data + '</td>' +
                            '</tr>' +
                            '' +
                            '<tr>' +
                            '<td>' + '<b>OPERADOR:</b><br> ' + this.colaborador.usuario.login + '</td>' +
                            '<td style="text-align: right;">' + '<b style="font-size: ">GARÇON:</b><br> ' + this.getGarcon() + '</td>' +
                            '</tr>' +
                            '' +
                            '<tr style="font-weight: bold">' +
                            '<td>MESA: ' + this.mesa.local + '</td>' +
                            '<td style="text-align: right">SEQ: ' + comandaComEncargo.codigo.split('-')[2] + '</td>' +
                            '</tr>' +
                            '' +
                            '</table> ' +

                            '<div style="text-align: center; ">' +
                            'NÃO É DOCUMENTO FISCAL' +
                            '</div>' +

                            '<table style="width: 100%; border: none;">' +

                            '<tr style="font-weight: bold; border-bottom: 1px solid black; border-top: 2px solid black">' +
                            '<td>QTDE.</td>' +
                            '<td style="text-align: center">DESCRIÇÃO</td>' +
                            '<td style="text-align: center">UNIT.</td>' +
                            '<td style="text-align: right;">TOTAL</td>' +
                            '</tr>' +


                            this.vendas.map((venda) => {
                                const produto :Produto = venda.produto as Produto;

                                return ('<tr style="line-height: 4px">' +
                                '<td>'+ ( Produto.isDecimal(produto) ? this.getTransform(venda.quantidade) : venda.quantidade)+ '' + this.up.transform(produto)+'</td>' +
                                '<td>'+produto.nome+'</td>' +
                                '<td style="text-align: center">'+  this.getTransform(produto.preco) +'</td>' +
                                '<td style="text-align: right; font-weight: bold">'+ this.getTransform(venda.quantidade*produto.preco)+'</td>' +
                                '</tr>');
                            }).join('') +

                            '</table>' +

                            '<div style="text-align: right; padding-right: 10px;">SUBTOTAL: '+this.getTransform(comandaComEncargo.total) +'</div>' +
                            '<div style="text-align: right; padding-right: 10px;">SERVIÇO: '+this.getTransform(comandaComEncargo.gorjeta)+'</div>' +

                            '<table style="width: 100%; border: 1px solid black; margin: 0px">' +
                            '<tr style="font-weight: bold; line-height: 6px">' +
                            '<td>TOTAL' + '</td>' +
                            '<td style="text-align: right; font-size: 10px">' +
                            this.cp.transform((comandaComEncargo.total + comandaComEncargo.gorjeta), 'BRL', true, '1.2-2')
                                .replace('$', '$ ') + '</td>' +
                            '</tr>' +
                            '</table>' +
                            '' +
                            '<div style="font-size:">' +
                            'TEMPO DE PERMANENCIA: ' + new Date(dt.getTime() - this.getMesaProp().time).toISOString().replace(/.*T|\D\d+Z/g, '') + '<br>' +
                            '<b>PESSOAS: ' + this.getPessoas() + '</b><br>' +
                            '<b>POR PESSOA: ' + this.cp.transform(
                            (comandaComEncargo.total + comandaComEncargo.gorjeta) / this.getPessoas(),
                            'BRL',
                            true,
                            '1.2-2')
                                .replace('$', '$ ') + '<b>' +
                            '</div>' +
                            '' +
                            '<br>' +

                            '<div style="text-align: center; font-weight: bold">BEM VINDO AO '+restaurante.nomeFantasia+'</div>' +

                            '<p style="text-align: center"><b>SISTEMA     <i>E-RESTAURANTE</i></b></p>' +
                            '' +
                            '<br>' +
                            '' +
                            '</div>' +
                            '<pre>' + id + '------------</pre>';


                        this.impressoraService.findForNota().subscribe(
                            impressora => this.preview(impressora, {
                                id: id,
                                texto: true,
                                request: new Date().toISOString(),
                                target: 'nota',
                                arquivo: template,
                                comanda: comandaComEncargo.id,
                                status: 1,
                                observavel: false,
                                sequenciavel: 2
                            }, id)
                        );

                    }
                );
        });


    }





    preview(impressora:Impressora, data: any, id :string) {

        let script :any = {};

        if (impressora.script) {
            try {
                script = JSON.parse(impressora.script);
            } catch (e) {
                console.log('Dados erroneos: ' + impressora.script);
                console.error(e);
            }
        }

        if (!script.data) {
            script.data = [];
        }

        script.data.push(data);

        impressora.script = JSON.stringify(script);

        this.impressoraService.update(impressora).subscribe((ip) => {
            this.router.navigate([{
                outlets: {
                    popup: 'impressora-preview/' + ip.id + '/' + id
                }
            }]);
        });

    }


}
