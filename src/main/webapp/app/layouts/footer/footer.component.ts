import {Component, OnInit} from '@angular/core';
import {Restaurante} from "../../entities/restaurante/restaurante.model";
import {Endereco} from "../../entities/endereco/endereco.model";
import {RestauranteService} from "../../entities/restaurante/restaurante.service";

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    detalhes1: string;
    detalhes2: string;

   constructor(
       private restauranteService: RestauranteService){}


    ngOnInit(): void {
        this.restauranteService.query()

            .map(res => res.json[0])

            .subscribe(
                (restaurante: Restaurante) => {


                    const endereco = restaurante.endereco as Endereco;

                    this.detalhes1 = endereco.logradouro + ' ' + endereco.local + ', ' + endereco.numero;
                    this.detalhes2= endereco.cidade + '-' + endereco.estado + ' ' + restaurante.telefone;


                });
    }





}
