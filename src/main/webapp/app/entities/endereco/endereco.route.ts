import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EnderecoComponent } from './endereco.component';
import { EnderecoDetailComponent } from './endereco-detail.component';
import { EnderecoPopupComponent } from './endereco-dialog.component';
import { EnderecoDeletePopupComponent } from './endereco-delete-dialog.component';

export const enderecoRoute: Routes = [
    {
        path: 'endereco',
        component: EnderecoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'endereco/:id',
        component: EnderecoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enderecoPopupRoute: Routes = [
    {
        path: 'endereco-new',
        component: EnderecoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'endereco/:id/edit',
        component: EnderecoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'endereco/:id/delete',
        component: EnderecoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
