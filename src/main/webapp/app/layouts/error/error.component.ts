import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AutologinService} from "../../shared/login/autologin.service";

@Component({
    selector: 'jhi-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    errorMessage: string;
    error403: boolean;

    constructor(
        private route: ActivatedRoute,
        private autologin: AutologinService
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe((routeData) => {
            if (routeData.error403) {
                this.error403 = routeData.error403;
            }
            if (routeData.errorMessage) {
                this.errorMessage = routeData.errorMessage;
            }
        });
        this.autologin.autoLogin(true);
    }
}
