import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Principal } from '../';
import { LoginModalService } from '../login/login-modal.service';
import { StateStorageService } from './state-storage.service';
import {AutologinService} from "../login/autologin.service";

@Injectable()
export class UserRouteAccessService implements CanActivate {

    constructor(private router: Router,
                private loginModalService: LoginModalService,
                private principal: Principal,
                private stateStorageService: StateStorageService,
                private autologin: AutologinService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

        const authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the principal.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {

        const principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {

            if (!authorities || authorities.length === 0) {
                return true;
            }

            if (account) {


                if (this.autologin.accountIsAutologin(account)) {

                    if (!url || url.length < 4 || /.*comanda\/\d+/.test(url) || /.*mesa\/\d+/.test(url)) {
                        return true;
                    } else {
                        this.router.navigate(['']).then(() => {
                            this.autologin.autoLogin(true);
                        });
                    }
                } else {

                    this.stateStorageService.storeUrl(url);

                    return principal.hasAnyAuthority(authorities).then(
                        (response) => {
                            if (response) {
                                return true;
                            }
                            this.autologin.autoLogin(true);
                            return false;
                        }
                    );
                }
            } else {

                this.stateStorageService.storeUrl(url);
                this.router.navigate(['accessdenied']).then(() => {
                    // only show the login dialog, if the user hasn't logged in yet
                    if (!account) {
                        this.loginModalService.open();
                    }
                    this.autologin.autoLogin(true);
                });
                return false;
            }
        }));
    }
}
