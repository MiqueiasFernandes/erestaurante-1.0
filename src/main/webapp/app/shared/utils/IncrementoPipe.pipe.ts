import { Pipe, PipeTransform } from '@angular/core';
import {Produto, Unidade} from "../../entities/produto/produto.model";

@Pipe({name: 'incremento'})
export class IncrementoPipe implements PipeTransform {

    transform(produto: Produto): number {
        return (Produto.tipoEquals(Unidade.UNIDADE, produto.unidade) ||
            Produto.tipoEquals(Unidade.DUZIA, produto.unidade) ||
            Produto.tipoEquals(Unidade.DEZENA, produto.unidade) ||
            Produto.tipoEquals(Unidade.CENTENA, produto.unidade) ||
            Produto.tipoEquals(Unidade.MILHAR, produto.unidade) ||
            Produto.tipoEquals(Unidade.SACA, produto.unidade) ) ? 0.01 : 1;
    }
}
