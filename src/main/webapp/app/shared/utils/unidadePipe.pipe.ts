import { Pipe, PipeTransform } from '@angular/core';
import {Produto, Unidade} from "../../entities/produto/produto.model";

@Pipe({name: 'unidade'})
export class UnidadePipe implements PipeTransform {

    transform(produto: Produto): string {
        const data = [
            'UN',
            'DEZENA',
            'CENTO',
            'MIL',
            'DZ',
            'SACA',
            'MT',
            'MT3',
            'MT2',
            'KG',
            'TON',
            'LT'
        ];
        const index = Produto.getTipo(produto);
        return  ((index >= 0) && (index < data.length)) ? data[index] : '';
    }

}
