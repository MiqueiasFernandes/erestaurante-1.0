import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    ERestauranteSharedLibsModule,
    ERestauranteSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    JhiTrackerService,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent
} from './';
import {TableheaderDirective} from "./utils/tableheader.directive";
import {AutologinService} from './login/autologin.service';
import {VariaveisService} from "./utils/variaveis.service";

@NgModule({
    imports: [
        ERestauranteSharedLibsModule,
        ERestauranteSharedCommonModule
    ],
    declarations: [
TableheaderDirective,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
AutologinService,
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        UserService,
        DatePipe,
        VariaveisService
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
TableheaderDirective,
        ERestauranteSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ERestauranteSharedModule {}
