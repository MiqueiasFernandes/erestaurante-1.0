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
import {FecharComponent, LancamentoFecharPopupComponent} from './fechar/fechar.component';


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
        LancamentoFecharPopupComponent,
        FecharComponent,
    ],
    entryComponents: [
        LancamentoComponent,
        LancamentoDialogComponent,
        LancamentoPopupComponent,
        LancamentoDeleteDialogComponent,
        LancamentoDeletePopupComponent,
        FecharComponent,
        LancamentoFecharPopupComponent
    ],
    providers: [
        LancamentoService,
        LancamentoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteLancamentoModule {}
