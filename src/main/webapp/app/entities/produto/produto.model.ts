import { BaseEntity } from './../../shared';
import {isNullOrUndefined, isNumber} from "util";

export const enum Unidade {
    'METRO',
    'METRO_QUADRADO',
    'METRO_CUBICO',
    'KILOGRAMA',
    'TONELADA',
    'LITRO',
    'UNIDADE',
    'DEZENA',
    'DUZIA',
    'CENTENA',
    'MILHAR',
    'SACA'
}

export class Produto implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public nome?: string,
        public fornecedor?: string,
        public estoque?: number,
        public valor?: number,
        public preco?: number,
        public fotoContentType?: string,
        public foto?: any,
        public descricao?: string,
        public html?: string,
        public observacao?: string,
        public opcional?: string,
        public adicional?: string,
        public unidade?: Unidade,
        public imposto?: BaseEntity,
    ) {
    }

    public isUnidade(unidade :any) :boolean{
        return Produto.tipoEquals(unidade, this.unidade);
    }

    public static tipoEquals(c1, c2) :boolean{
        return this.getTipo(c1) === this.getTipo(c2);
    }

    public static getTipo(t) :number{
        if (isNumber(t))
            return t;
        if (Unidade.UNIDADE === t)
            return 0;
        if (Unidade.DEZENA === t)
            return 1;
        if (Unidade.CENTENA === t)
            return 2;
        if (Unidade.MILHAR === t)
            return 3;
        if (Unidade.DUZIA === t)
            return 4;
        if (Unidade.SACA === t)
            return 5;
        if (Unidade.METRO === t)
            return 6;
        if (Unidade.METRO_CUBICO === t)
            return 7;
        if (Unidade.METRO_QUADRADO === t)
            return 8;
        if (Unidade.KILOGRAMA === t)
            return 9;
        if (Unidade.TONELADA === t)
            return 10;
        if (Unidade.LITRO === t)
            return 11;

        if ('UNIDADE'.startsWith(t))
            return 0;
        if ('DEZENA'.startsWith(t))
            return 1;
        if ('CENTENA'.startsWith(t))
            return 2;
        if ('MILHAR'.startsWith(t))
            return 3;
        if ('DUZIA'.startsWith(t))
            return 4;
        if ('SACA'.startsWith(t))
            return 5;
        if ('METRO'.startsWith(t))
            return 6;
        if ('METRO_CUBICO'.startsWith(t))
            return 7;
        if ('METRO_QUADRADO'.startsWith(t))
            return 8;
        if ('KILOGRAMA'.startsWith(t))
            return 9;
        if ('TONELADA'.startsWith(t))
            return 10;
        if ('LITRO'.startsWith(t))
            return 11;

        if (!isNullOrUndefined(t.Unidade)) {
            return this.getTipo(t.Unidade);
        }
        return -1;
    }

}
