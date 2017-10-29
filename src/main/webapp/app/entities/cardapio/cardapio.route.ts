import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CardapioComponent } from './cardapio.component';
import { CardapioDetailComponent } from './cardapio-detail.component';
import { CardapioPopupComponent } from './cardapio-dialog.component';
import { CardapioDeletePopupComponent } from './cardapio-delete-dialog.component';

@Injectable()
export class CardapioResolvePagingParams implements Resolve<any> {

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

export const cardapioRoute: Routes = [
    {
        path: 'cardapio',
        component: CardapioComponent,
        resolve: {
            'pagingParams': CardapioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cardapio/:id',
        component: CardapioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardapioPopupRoute: Routes = [
    {
        path: 'cardapio-new',
        component: CardapioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cardapio/:id/edit',
        component: CardapioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cardapio/:id/delete',
        component: CardapioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
