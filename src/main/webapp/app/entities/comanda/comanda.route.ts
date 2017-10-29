import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ComandaComponent } from './comanda.component';
import { ComandaDetailComponent } from './comanda-detail.component';
import { ComandaPopupComponent } from './comanda-dialog.component';
import { ComandaDeletePopupComponent } from './comanda-delete-dialog.component';

export const comandaRoute: Routes = [
    {
        path: 'comanda',
        component: ComandaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.comanda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comanda/:id',
        component: ComandaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.comanda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comandaPopupRoute: Routes = [
    {
        path: 'comanda-new',
        component: ComandaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.comanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comanda/:id/edit',
        component: ComandaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.comanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comanda/:id/delete',
        component: ComandaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.comanda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
