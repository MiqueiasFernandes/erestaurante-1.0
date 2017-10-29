import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    VendaService,
    VendaPopupService,
    VendaComponent,
    VendaDetailComponent,
    VendaDialogComponent,
    VendaPopupComponent,
    VendaDeletePopupComponent,
    VendaDeleteDialogComponent,
    vendaRoute,
    vendaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...vendaRoute,
    ...vendaPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VendaComponent,
        VendaDetailComponent,
        VendaDialogComponent,
        VendaDeleteDialogComponent,
        VendaPopupComponent,
        VendaDeletePopupComponent,
    ],
    entryComponents: [
        VendaComponent,
        VendaDialogComponent,
        VendaPopupComponent,
        VendaDeleteDialogComponent,
        VendaDeletePopupComponent,
    ],
    providers: [
        VendaService,
        VendaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteVendaModule {}
