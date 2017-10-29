import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ImpostoComponent } from './imposto.component';
import { ImpostoDetailComponent } from './imposto-detail.component';
import { ImpostoPopupComponent } from './imposto-dialog.component';
import { ImpostoDeletePopupComponent } from './imposto-delete-dialog.component';

@Injectable()
export class ImpostoResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const impostoRoute: Routes = [
    {
        path: 'imposto',
        component: ImpostoComponent,
        resolve: {
            'pagingParams': ImpostoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.imposto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'imposto/:id',
        component: ImpostoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.imposto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const impostoPopupRoute: Routes = [
    {
        path: 'imposto-new',
        component: ImpostoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.imposto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'imposto/:id/edit',
        component: ImpostoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.imposto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'imposto/:id/delete',
        component: ImpostoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.imposto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
