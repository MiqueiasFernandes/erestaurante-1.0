import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { ERestauranteSharedModule, UserRouteAccessService } from './shared';
import { ERestauranteHomeModule } from './home/home.module';
import { ERestauranteAdminModule } from './admin/admin.module';
import { ERestauranteAccountModule } from './account/account.module';
import { ERestauranteEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import { TableheaderComponent } from './layouts/tableheader/tableheader.component';
import {PreferenciasService} from "./entities/preferencias.service";
import {PrivilegiosService} from "./entities/privilegios.service";
import {NotifyService} from "./entities/notify.service";
import { MenuGerencialModule } from './menu-gerencial/menu-gerencial.module';




@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        ERestauranteSharedModule,
        ERestauranteHomeModule,
        ERestauranteAdminModule,
        ERestauranteAccountModule,
        ERestauranteEntityModule,
        MenuGerencialModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    entryComponents: [
        TableheaderComponent,
    ],
    declarations: [
TableheaderComponent,
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        PreferenciasService,
        PrivilegiosService,
        NotifyService,
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class ERestauranteAppModule {}
