import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ERestauranteProdutoModule } from './produto/produto.module';
import { ERestauranteEnderecoModule } from './endereco/endereco.module';
import { ERestauranteClienteModule } from './cliente/cliente.module';
import { ERestauranteMesaModule } from './mesa/mesa.module';
import { ERestauranteVendaModule } from './venda/venda.module';
import { ERestauranteComandaModule } from './comanda/comanda.module';
import { ERestauranteColaboradorModule } from './colaborador/colaborador.module';
import { ERestauranteCargoModule } from './cargo/cargo.module';
import { ERestauranteCardapioModule } from './cardapio/cardapio.module';
import { ERestauranteImpostoModule } from './imposto/imposto.module';
import { ERestauranteLancamentoModule } from './lancamento/lancamento.module';
import { ERestauranteNotaModule } from './nota/nota.module';
import { ERestauranteRestauranteModule } from './restaurante/restaurante.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ERestauranteProdutoModule,
        ERestauranteEnderecoModule,
        ERestauranteClienteModule,
        ERestauranteMesaModule,
        ERestauranteVendaModule,
        ERestauranteComandaModule,
        ERestauranteColaboradorModule,
        ERestauranteCargoModule,
        ERestauranteCardapioModule,
        ERestauranteImpostoModule,
        ERestauranteLancamentoModule,
        ERestauranteNotaModule,
        ERestauranteRestauranteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteEntityModule {}
