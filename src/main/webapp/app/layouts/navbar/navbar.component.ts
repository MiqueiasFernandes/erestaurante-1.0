import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService, VariaveisService } from '../../shared';

import { VERSION, DEBUG_INFO_ENABLED } from '../../app.constants';
import {PrivilegiosService} from "../../entities/privilegios.service";
import { JhiEventManager } from 'ng-jhipster';
import {AutologinService} from "../../shared/login/autologin.service";
import {Comanda} from "../../entities/comanda/comanda.model";
import {Mesa} from "../../entities/mesa/mesa.model";
import {Cardapio} from "../../entities/cardapio/cardapio.model";
import {SelectComponent} from "../../entities/mesa/select/select.component";
import {isNullOrUndefined} from "util";
@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    permissoes :string[] = [];
    autoLogin = false;
    comanda :Comanda;
    mesa :Mesa;
    isOpen = false;
    dia = '';

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private autoLoginService: AutologinService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private privilegios :PrivilegiosService,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private variaveis :VariaveisService
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().subscribe((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.eventManager.subscribe('logout', (message) => {
            this.router.navigate(['']);
            this.atualizar();
        });

        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.atualizar();
        });

        this.eventManager.subscribe('autologin', (message) => {
            this.router.navigate(['']);
            this.autoLogin = message && message.content && message.content.startsWith('true');
            this.atualizar();
        });

        this.autoLoginService.isAutoLogin().then((is) => {this.autoLogin = is});

        this.variaveis.mesaComandaObserver$.subscribe(
            (mesaEcomanda :{mesa :Mesa, comanda :Comanda}) => {
            this.mesa = mesaEcomanda.mesa;
            this.comanda = mesaEcomanda.comanda;
        });

        this.variaveis.cardapioObserver$.subscribe((dia) => {
            this.dia = ' (';
            switch (dia.valueOf()) {
                case 0: this.dia += 'Dom'; break;
                case 1: this.dia += 'Seg'; break;
                case 2: this.dia += 'Ter'; break;
                case 3: this.dia += 'Qua'; break;
                case 4: this.dia += 'Qui'; break;
                case 5: this.dia += 'Sex'; break;
                case 6: this.dia += 'Sáb'; break;
            }
            this.dia += ')'
        });

        this.atualizar();
    }

    atualizar() {

        if (this.isAuthenticated()) {
            this.privilegios.hasPermissao('produto', 'editar', true).subscribe(
                (res: { has: boolean, privs: string[][] }) => {
                    Object.keys(res.privs).forEach(k => {
                        if (res.privs[k].length > 0) {
                            this.permissoes.push(k);
                            this.permissoes[k] = true;
                        }
                    });
                }
            );
        }

        this.variaveis.update();
    }

    changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout(nonotify? :boolean) {
        this.collapseNavbar();
        this.loginService.logout(nonotify);
        this.router.navigate(['']);
        if (nonotify) {
            this.autoLogin = false;
            this.login();
        }
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }


    getMesa() :string {
        if(!isNullOrUndefined(this.mesa)){
            return '(' + this.mesa.codigo + ')';
        }

        return '';
    }

    getComanda() :string {
        if(!isNullOrUndefined(this.comanda)){
            return '( R$ ' + this.comanda.total + ' )';
        }
        return '';
    }

    updateComanda() {
        this.variaveis.update();
    }

    setMesa() {
        if (!this.variaveis.hasMesa()) {
            this.open();
        } else {
            this.variaveis.update();
        }
    }

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(SelectComponent, {
            container: 'nav'
        });
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }

    setCardapio(dia) {
        this.router.navigate(['']).then(() => {
            this.variaveis.setCardapioDay(Cardapio.diaToDia(Cardapio.getDia(dia)));
        });
    }

    getDias() {
        return Cardapio.getDiasString();
    }

}
