import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LancamentoComponent } from './lancamento.component';
import { LancamentoDetailComponent } from './lancamento-detail.component';
import { LancamentoPopupComponent } from './lancamento-dialog.component';
import { LancamentoDeletePopupComponent } from './lancamento-delete-dialog.component';
import {LancamentoFecharPopupComponent} from "./fechar/fechar.component";

export const lancamentoRoute: Routes = [
    {
        path: 'lancamento',
        component: LancamentoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.lancamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lancamento/:id',
        component: LancamentoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.lancamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lancamentoPopupRoute: Routes = [
    {
        path: 'lancamento-new',
        component: LancamentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.lancamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lancamento-comanda/:comanda',
        component: LancamentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.lancamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lancamento/:id/edit',
        component: LancamentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.lancamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lancamento/:id/delete',
        component: LancamentoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.lancamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lancamento/:id/fechar',
        component: LancamentoFecharPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.lancamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
