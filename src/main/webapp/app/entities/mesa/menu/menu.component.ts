import { Component, OnInit } from '@angular/core';
import {MesaService} from "../mesa.service";
import {Mesa} from "../mesa.model";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import { JhiAlertService} from 'ng-jhipster';
import {Router} from "@angular/router";

@Component({
    selector: 'jhi-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    mesas :Mesa[];
    mesaColor: string[] = [];

    constructor(
        private jhiAlertService: JhiAlertService,
        private mesaService :MesaService,
        private router: Router
    ) { }

    ngOnInit() {
        this.mesaService.query({
            page: 0,
            size: 100}).subscribe(
            (res) => this.onSucess(res),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSucess(res) {
        this.mesas = res.json;
        this.mesas.forEach(m => this.setMesa(m));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }



    setMesa(mesa :Mesa, opt? : number) {

        let color = 'gray';

        if (opt) {
            switch (opt) {
                case 0:
                    color = 'gray';
                    break;
                case 1:
                    color = 'red';
                    break;
                case 2:
                    color = 'blue';
                    break;
                case 3:
                    color = 'green';
                    break;
            }
        }

        this.mesaColor[mesa.id] = color;
    }


    routear(mesa :Mesa) {
        this.router.navigate(['/venda/bymesa/' + mesa.id])
    }


}
