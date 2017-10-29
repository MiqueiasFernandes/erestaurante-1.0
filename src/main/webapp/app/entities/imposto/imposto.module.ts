import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    ImpostoService,
    ImpostoPopupService,
    ImpostoComponent,
    ImpostoDetailComponent,
    ImpostoDialogComponent,
    ImpostoPopupComponent,
    ImpostoDeletePopupComponent,
    ImpostoDeleteDialogComponent,
    impostoRoute,
    impostoPopupRoute,
    ImpostoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...impostoRoute,
    ...impostoPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ImpostoComponent,
        ImpostoDetailComponent,
        ImpostoDialogComponent,
        ImpostoDeleteDialogComponent,
        ImpostoPopupComponent,
        ImpostoDeletePopupComponent,
    ],
    entryComponents: [
        ImpostoComponent,
        ImpostoDialogComponent,
        ImpostoPopupComponent,
        ImpostoDeleteDialogComponent,
        ImpostoDeletePopupComponent,
    ],
    providers: [
        ImpostoService,
        ImpostoPopupService,
        ImpostoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteImpostoModule {}
