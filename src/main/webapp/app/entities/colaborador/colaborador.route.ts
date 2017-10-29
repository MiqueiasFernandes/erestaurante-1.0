import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ColaboradorComponent } from './colaborador.component';
import { ColaboradorDetailComponent } from './colaborador-detail.component';
import { ColaboradorPopupComponent } from './colaborador-dialog.component';
import { ColaboradorDeletePopupComponent } from './colaborador-delete-dialog.component';

@Injectable()
export class ColaboradorResolvePagingParams implements Resolve<any> {

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

export const colaboradorRoute: Routes = [
    {
        path: 'colaborador',
        component: ColaboradorComponent,
        resolve: {
            'pagingParams': ColaboradorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.colaborador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'colaborador/:id',
        component: ColaboradorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.colaborador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colaboradorPopupRoute: Routes = [
    {
        path: 'colaborador-new',
        component: ColaboradorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.colaborador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colaborador/:id/edit',
        component: ColaboradorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.colaborador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colaborador/:id/delete',
        component: ColaboradorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.colaborador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
