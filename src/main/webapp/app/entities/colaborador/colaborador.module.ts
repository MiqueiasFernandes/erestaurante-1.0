import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import { ERestauranteAdminModule } from '../../admin/admin.module';
import {
    ColaboradorService,
    ColaboradorPopupService,
    ColaboradorComponent,
    ColaboradorDetailComponent,
    ColaboradorDialogComponent,
    ColaboradorPopupComponent,
    ColaboradorDeletePopupComponent,
    ColaboradorDeleteDialogComponent,
    colaboradorRoute,
    colaboradorPopupRoute,
    ColaboradorResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...colaboradorRoute,
    ...colaboradorPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        ERestauranteAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ColaboradorComponent,
        ColaboradorDetailComponent,
        ColaboradorDialogComponent,
        ColaboradorDeleteDialogComponent,
        ColaboradorPopupComponent,
        ColaboradorDeletePopupComponent,
    ],
    entryComponents: [
        ColaboradorComponent,
        ColaboradorDialogComponent,
        ColaboradorPopupComponent,
        ColaboradorDeleteDialogComponent,
        ColaboradorDeletePopupComponent,
    ],
    providers: [
        ColaboradorService,
        ColaboradorPopupService,
        ColaboradorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteColaboradorModule {}
