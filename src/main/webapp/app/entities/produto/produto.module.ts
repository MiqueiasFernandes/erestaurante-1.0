import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    ProdutoService,
    ProdutoPopupService,
    ProdutoComponent,
    ProdutoDetailComponent,
    ProdutoDialogComponent,
    ProdutoPopupComponent,
    ProdutoDeletePopupComponent,
    ProdutoDeleteDialogComponent,
    produtoRoute,
    produtoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...produtoRoute,
    ...produtoPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProdutoComponent,
        ProdutoDetailComponent,
        ProdutoDialogComponent,
        ProdutoDeleteDialogComponent,
        ProdutoPopupComponent,
        ProdutoDeletePopupComponent,
    ],
    entryComponents: [
        ProdutoComponent,
        ProdutoDialogComponent,
        ProdutoPopupComponent,
        ProdutoDeleteDialogComponent,
        ProdutoDeletePopupComponent,
    ],
    providers: [
        ProdutoService,
        ProdutoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteProdutoModule {}
