import { BaseEntity } from './../../shared';

import {isNullOrUndefined, isNumber} from "util";

export const enum VendaStatus {
    'PEDIDO',
    'AUTORIZADO',
    'PRODUZINDO',
    'ENTREGUE',
    'CANCELADO'
}

export class Venda implements BaseEntity {
    constructor(
        public id?: number,
        public data?: any,
        public quantidade?: number,
        public desconto?: number,
        public valorizacao?: number,
        public status?: VendaStatus,
        public produto?: BaseEntity,
        public comanda?: BaseEntity,
    ) {
    }

    public  static tipoEquals(c1, c2) :boolean{
        return this.getTipo(c1) === this.getTipo(c2);
    }


    public static getTipo(t) :number{
        if (isNumber(t))
            return t;
        if (VendaStatus.PEDIDO === t)
            return 0;
        if (VendaStatus.AUTORIZADO === t)
            return 1;
        if (VendaStatus.PRODUZINDO === t)
            return 2;
        if (VendaStatus.ENTREGUE === t)
            return 3;
        if (VendaStatus.CANCELADO === t)
            return 4;
        if ("PEDIDO".startsWith(t))
            return 0;
        if ("AUTORIZADO".startsWith(t))
            return 1;
        if ("PRODUZINDO".startsWith(t))
            return 2;
        if ("ENTREGUE".startsWith(t))
            return 3;
        if ("CANCELADO".startsWith(t))
            return 4;
        if (!isNullOrUndefined(t.status)) {
            return this.getTipo(t.status);
        }
        return -1;
    }

    static getAllToString() {
        return [
            Venda.getStatusToString(0),
            Venda.getStatusToString(1),
            Venda.getStatusToString(2),
            Venda.getStatusToString(3),
            Venda.getStatusToString(4)
        ];
    }

    static getAprovadosToString() {
        return [
            Venda.getStatusToString(1),
            Venda.getStatusToString(2),
            Venda.getStatusToString(3)
        ];
    }

    static getPendentesToString() {
        return [
            Venda.getStatusToString(1),
            Venda.getStatusToString(2),
            Venda.getStatusToString(0)
        ];
    }

    public isEntregue() :boolean{
        return Venda.getTipo(this.status) > 2;
    }

    static getStatusToString(status) :string{
        switch (Venda.getTipo(status)) {
            case 0: return 'PEDIDO';
            case 1: return  'AUTORIZADO';
            case 2: return 'PRODUZINDO';
            case 3: return 'ENTREGUE';
            case 4: return 'CANCELADO';
        }
    }


}
