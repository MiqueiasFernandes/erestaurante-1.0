import { Route } from '@angular/router';

import { MenuGerencialComponent } from './';
import {UserRouteAccessService} from "../shared/auth/user-route-access-service";

export const MENU_GERENCIAL_ROUTE: Route = {
    path: 'menugerencial',
    component: MenuGerencialComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'menugerencial.title'
    },
    canActivate: [UserRouteAccessService]
};
