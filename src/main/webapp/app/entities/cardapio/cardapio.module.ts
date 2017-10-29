import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    CardapioService,
    CardapioPopupService,
    CardapioComponent,
    CardapioDetailComponent,
    CardapioDialogComponent,
    CardapioPopupComponent,
    CardapioDeletePopupComponent,
    CardapioDeleteDialogComponent,
    cardapioRoute,
    cardapioPopupRoute,
    CardapioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cardapioRoute,
    ...cardapioPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CardapioComponent,
        CardapioDetailComponent,
        CardapioDialogComponent,
        CardapioDeleteDialogComponent,
        CardapioPopupComponent,
        CardapioDeletePopupComponent,
    ],
    entryComponents: [
        CardapioComponent,
        CardapioDialogComponent,
        CardapioPopupComponent,
        CardapioDeleteDialogComponent,
        CardapioDeletePopupComponent,
    ],
    providers: [
        CardapioService,
        CardapioPopupService,
        CardapioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteCardapioModule {}
