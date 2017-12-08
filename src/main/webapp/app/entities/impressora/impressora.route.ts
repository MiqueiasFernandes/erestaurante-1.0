import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ImpressoraComponent } from './impressora.component';
import { ImpressoraDetailComponent } from './impressora-detail.component';
import { ImpressoraPopupComponent } from './impressora-dialog.component';
import { ImpressoraDeletePopupComponent } from './impressora-delete-dialog.component';
import {ImpressoraAssistentePopupComponent} from "./assistente/assistente.component";
import {ImpressoraPreviewPopupComponent} from "./preview/preview.component";

export const impressoraRoute: Routes = [
    {
        path: 'impressora',
        component: ImpressoraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.impressora.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'impressora/:id',
        component: ImpressoraDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.impressora.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const impressoraPopupRoute: Routes = [
    {
        path: 'impressora-new',
        component: ImpressoraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.impressora.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'impressora-assistente',
        component: ImpressoraAssistentePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.impressora.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'impressora-preview/:id/:data',
        component: ImpressoraPreviewPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.impressora.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'impressora/:id/edit',
        component: ImpressoraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.impressora.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'impressora/:id/delete',
        component: ImpressoraDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.impressora.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
