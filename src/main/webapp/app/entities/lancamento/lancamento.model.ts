import { BaseEntity } from './../../shared';
import {isNullOrUndefined, isNumber} from "util";

export const enum Natureza {
    'A_VISTA_DINHEIRO',
    'A_PRAZO_DINHEIRO',
    'A_VISTA_CARTAO',
    'A_PRAZO_CARTAO',
    'A_VISTA_CHEQUE',
    'A_PRAZO_CHEQUE'
}

export class Lancamento implements BaseEntity {
    constructor(
        public id?: number,
        public isentrada?: boolean,
        public data?: any,
        public vencimento?: any,
        public natureza?: Natureza,
        public valor?: number,
        public parcelas?: number,
        public observacao?: string,
        public comanda?: BaseEntity,
        public colaborador?: BaseEntity,
    ) {
        this.isentrada = false;
    }

    public isAPrazo() {
        return Lancamento.tipoEquals(this.natureza, Natureza.A_PRAZO_CARTAO) ||
            Lancamento.tipoEquals(this.natureza, Natureza.A_PRAZO_CHEQUE) ||
            Lancamento.tipoEquals(this.natureza, Natureza.A_PRAZO_DINHEIRO);
    }

    // public isAPrazo(lancamento) {
    //     return Lancamento.tipoEquals(lancamento.natureza, Natureza.A_PRAZO_CARTAO) ||
    //         Lancamento.tipoEquals(lancamento.natureza, Natureza.A_PRAZO_CHEQUE) ||
    //         Lancamento.tipoEquals(lancamento.natureza, Natureza.A_PRAZO_DINHEIRO);
    // }

    public static tipoEquals(c1, c2) :boolean{
        return this.getTipo(c1) === this.getTipo(c2);
    }

    public static getTipo(t) :number{
        if (isNumber(t))
            return t;
        if (Natureza.A_VISTA_DINHEIRO === t)
            return 0;
        if (Natureza.A_PRAZO_DINHEIRO === t)
            return 1;
        if (Natureza.A_VISTA_CARTAO === t)
            return 2;
        if (Natureza.A_PRAZO_CARTAO === t)
            return 3;
        if (Natureza.A_VISTA_CHEQUE === t)
            return 3;
        if (Natureza.A_PRAZO_CHEQUE === t)
            return 3;
        if ("A_VISTA_DINHEIRO".startsWith(t))
            return 0;
        if ("A_PRAZO_DINHEIRO".startsWith(t))
            return 1;
        if ("A_VISTA_CARTAO".startsWith(t))
            return 2;
        if ("A_PRAZO_CARTAO".startsWith(t))
            return 3;
        if ("A_VISTA_CHEQUE".startsWith(t))
            return 4;
        if ("A_PRAZO_CHEQUE".startsWith(t))
            return 5;
        if (!isNullOrUndefined(t.tipo)) {
            return this.getTipo(t.tipo);
        }
        return -1;
    }

}
