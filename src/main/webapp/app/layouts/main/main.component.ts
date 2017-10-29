import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper } from '../../shared';
import { Principal } from '../../shared/auth/principal.service';
import { AutologinService } from '../../shared/login/autologin.service';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {

    constructor(
private loginService :AutologinService,
private principal :Principal,private eventManager: JhiEventManager,
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'eRestauranteApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });

        this.principal.identity().then((account) => {
            if (!account) {
                this.loginService.autoLogin();
            } else {
                this.loginService.verifyAccount(account);
            }
        });


        this.eventManager.subscribe('logout', (message) => {
            this.loginService.autoLogin();
        });

    }
}
