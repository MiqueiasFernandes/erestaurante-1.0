import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    RestauranteService,
    RestaurantePopupService,
    RestauranteComponent,
    RestauranteDetailComponent,
    RestauranteDialogComponent,
    RestaurantePopupComponent,
    RestauranteDeletePopupComponent,
    RestauranteDeleteDialogComponent,
    restauranteRoute,
    restaurantePopupRoute,
} from './';

const ENTITY_STATES = [
    ...restauranteRoute,
    ...restaurantePopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RestauranteComponent,
        RestauranteDetailComponent,
        RestauranteDialogComponent,
        RestauranteDeleteDialogComponent,
        RestaurantePopupComponent,
        RestauranteDeletePopupComponent,
    ],
    entryComponents: [
        RestauranteComponent,
        RestauranteDialogComponent,
        RestaurantePopupComponent,
        RestauranteDeleteDialogComponent,
        RestauranteDeletePopupComponent,
    ],
    providers: [
        RestauranteService,
        RestaurantePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteRestauranteModule {}
