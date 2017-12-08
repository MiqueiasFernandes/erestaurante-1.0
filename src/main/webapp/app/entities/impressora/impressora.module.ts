import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    ImpressoraService,
    ImpressoraPopupService,
    ImpressoraComponent,
    ImpressoraDetailComponent,
    ImpressoraDialogComponent,
    ImpressoraPopupComponent,
    ImpressoraDeletePopupComponent,
    ImpressoraDeleteDialogComponent,
    impressoraRoute,
    impressoraPopupRoute,
} from './';
import {AssistenteComponent, ImpressoraAssistentePopupComponent} from './assistente/assistente.component';
import {ImpressoraPreviewPopupComponent, PreviewComponent} from './preview/preview.component';

const ENTITY_STATES = [
    ...impressoraRoute,
    ...impressoraPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ImpressoraComponent,
        ImpressoraDetailComponent,
        ImpressoraDialogComponent,
        ImpressoraDeleteDialogComponent,
        ImpressoraPopupComponent,
        ImpressoraDeletePopupComponent,
        AssistenteComponent,
        PreviewComponent,
        ImpressoraPreviewPopupComponent,
        ImpressoraAssistentePopupComponent,
    ],
    entryComponents: [
        ImpressoraComponent,
        ImpressoraDialogComponent,
        ImpressoraPopupComponent,
        ImpressoraDeleteDialogComponent,
        ImpressoraDeletePopupComponent,
        AssistenteComponent,
        PreviewComponent,
        ImpressoraPreviewPopupComponent,
        ImpressoraAssistentePopupComponent
    ],
    providers: [
        ImpressoraService,
        ImpressoraPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteImpressoraModule {}
