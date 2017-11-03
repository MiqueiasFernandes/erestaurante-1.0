import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    LancamentoService,
    LancamentoPopupService,
    LancamentoComponent,
    LancamentoDetailComponent,
    LancamentoDialogComponent,
    LancamentoPopupComponent,
    LancamentoDeletePopupComponent,
    LancamentoDeleteDialogComponent,
    lancamentoRoute,
    lancamentoPopupRoute,
} from './';


import { ChartsModule } from 'ng2-charts';


const ENTITY_STATES = [
    ...lancamentoRoute,
    ...lancamentoPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        ChartsModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LancamentoComponent,
        LancamentoDetailComponent,
        LancamentoDialogComponent,
        LancamentoDeleteDialogComponent,
        LancamentoPopupComponent,
        LancamentoDeletePopupComponent,
    ],
    entryComponents: [
        LancamentoComponent,
        LancamentoDialogComponent,
        LancamentoPopupComponent,
        LancamentoDeleteDialogComponent,
        LancamentoDeletePopupComponent,
    ],
    providers: [
        LancamentoService,
        LancamentoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteLancamentoModule {}
