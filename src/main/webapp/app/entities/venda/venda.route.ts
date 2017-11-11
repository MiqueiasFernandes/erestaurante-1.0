import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { VendaComponent } from './venda.component';
import { VendaDetailComponent } from './venda-detail.component';
import { VendaPopupComponent } from './venda-dialog.component';
import { VendaDeletePopupComponent } from './venda-delete-dialog.component';
import {BymesaComponent} from "./bymesa/bymesa.component";

export const vendaRoute: Routes = [
    {
        path: 'venda',
        component: VendaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'venda/bymesa/:id',
        component: BymesaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'venda/:id',
        component: VendaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vendaPopupRoute: Routes = [
    {
        path: 'venda-new',
        component: VendaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'venda/:id/edit',
        component: VendaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'venda/:id/delete',
        component: VendaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
