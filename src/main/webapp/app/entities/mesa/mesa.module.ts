import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    MesaService,
    MesaPopupService,
    MesaComponent,
    MesaDetailComponent,
    MesaDialogComponent,
    MesaPopupComponent,
    MesaDeletePopupComponent,
    MesaDeleteDialogComponent,
    mesaRoute,
    mesaPopupRoute,
    MesaResolvePagingParams,
} from './';
import {MesaSelectPopupComponent, SelectComponent} from './select/select.component';

import { QrScannerModule } from '../qrcode';
import { QRCodeModule } from 'angular2-qrcode';
import { MenuComponent } from './menu/menu.component';

const ENTITY_STATES = [
    ...mesaRoute,
    ...mesaPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        QRCodeModule,
        QrScannerModule
    ],
    declarations: [
        MesaComponent,
        MesaDetailComponent,
        MesaDialogComponent,
        MesaDeleteDialogComponent,
        MesaPopupComponent,
        MesaDeletePopupComponent,
        SelectComponent,
        MesaSelectPopupComponent,
        MenuComponent,
        // QrScannerComponent
    ],
    entryComponents: [
        MesaComponent,
        MesaDialogComponent,
        MesaPopupComponent,
        MesaDeleteDialogComponent,
        MesaDeletePopupComponent,
        SelectComponent,
        MesaSelectPopupComponent
    ],
    providers: [
        MesaService,
        MesaPopupService,
        MesaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteMesaModule {}
