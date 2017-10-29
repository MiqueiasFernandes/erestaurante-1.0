import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    EnderecoService,
    EnderecoPopupService,
    EnderecoComponent,
    EnderecoDetailComponent,
    EnderecoDialogComponent,
    EnderecoPopupComponent,
    EnderecoDeletePopupComponent,
    EnderecoDeleteDialogComponent,
    enderecoRoute,
    enderecoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...enderecoRoute,
    ...enderecoPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EnderecoComponent,
        EnderecoDetailComponent,
        EnderecoDialogComponent,
        EnderecoDeleteDialogComponent,
        EnderecoPopupComponent,
        EnderecoDeletePopupComponent,
    ],
    entryComponents: [
        EnderecoComponent,
        EnderecoDialogComponent,
        EnderecoPopupComponent,
        EnderecoDeleteDialogComponent,
        EnderecoDeletePopupComponent,
    ],
    providers: [
        EnderecoService,
        EnderecoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteEnderecoModule {}
