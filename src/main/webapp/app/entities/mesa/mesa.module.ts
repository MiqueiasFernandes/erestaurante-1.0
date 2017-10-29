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

const ENTITY_STATES = [
    ...mesaRoute,
    ...mesaPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MesaComponent,
        MesaDetailComponent,
        MesaDialogComponent,
        MesaDeleteDialogComponent,
        MesaPopupComponent,
        MesaDeletePopupComponent,
    ],
    entryComponents: [
        MesaComponent,
        MesaDialogComponent,
        MesaPopupComponent,
        MesaDeleteDialogComponent,
        MesaDeletePopupComponent,
    ],
    providers: [
        MesaService,
        MesaPopupService,
        MesaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteMesaModule {}
