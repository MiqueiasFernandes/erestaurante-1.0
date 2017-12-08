import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { WindowRef } from './tracker/window.service';
import {
    ERestauranteSharedLibsModule,
    JhiLanguageHelper,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';
import {IncrementoPipe} from "./utils/IncrementoPipe.pipe";
import {UnidadePipe} from "./utils/unidadePipe.pipe";

@NgModule({
    imports: [
        ERestauranteSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        IncrementoPipe,
        UnidadePipe
    ],
    providers: [
        JhiLanguageHelper,
        WindowRef,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'pt-br'
        },
    ],
    exports: [
        ERestauranteSharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        IncrementoPipe,
        UnidadePipe
    ]
})
export class ERestauranteSharedCommonModule {}
