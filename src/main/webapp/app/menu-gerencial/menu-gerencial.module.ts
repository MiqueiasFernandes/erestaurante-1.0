import { NgModule } from '@angular/core';

import {MenuGerencialComponent} from './menu-gerencial.component';
import {RouterModule} from "@angular/router";
import {MENU_GERENCIAL_ROUTE} from "./menu-gerencial.route";


@NgModule({
  imports: [
      RouterModule.forRoot([ MENU_GERENCIAL_ROUTE ], { useHash: true })
  ],
  declarations: [MenuGerencialComponent]
})
export class MenuGerencialModule { }
