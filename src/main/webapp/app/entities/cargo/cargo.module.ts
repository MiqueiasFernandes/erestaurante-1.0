import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    CargoService,
    CargoPopupService,
    CargoComponent,
    CargoDetailComponent,
    CargoDialogComponent,
    CargoPopupComponent,
    CargoDeletePopupComponent,
    CargoDeleteDialogComponent,
    cargoRoute,
    cargoPopupRoute,
    CargoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cargoRoute,
    ...cargoPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CargoComponent,
        CargoDetailComponent,
        CargoDialogComponent,
        CargoDeleteDialogComponent,
        CargoPopupComponent,
        CargoDeletePopupComponent,
    ],
    entryComponents: [
        CargoComponent,
        CargoDialogComponent,
        CargoPopupComponent,
        CargoDeleteDialogComponent,
        CargoDeletePopupComponent,
    ],
    providers: [
        CargoService,
        CargoPopupService,
        CargoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteCargoModule {}
