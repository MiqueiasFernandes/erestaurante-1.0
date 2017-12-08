import { Component, OnInit } from '@angular/core';
import {LoginService} from "../shared/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'jhi-menu-gerencial',
  templateUrl: './menu-gerencial.component.html',
  styleUrls: ['./menu-gerencial.component.scss']
})
export class MenuGerencialComponent implements OnInit {

  constructor(
      private router: Router,
      private loginService :LoginService
  ) { }

  ngOnInit() {
  }

  logout(){
      this.loginService.logout(true);
      this.router.navigate(['']);
  }

}
