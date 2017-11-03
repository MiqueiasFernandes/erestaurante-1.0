import { BaseEntity } from './../../shared';
import {isNullOrUndefined, isNumber} from "util";

export const enum Status {
    'VAZIA',
    'ABERTA',
    'FECHADA',
    'PAGA'
}

export class Comanda implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public total?: number,
        public status?: Status,
        public gorjeta?: number,
        public nota?: BaseEntity,
        public lancamentos?: BaseEntity[],
        public pagador?: BaseEntity,
        public mesas?: BaseEntity[],
        public colaboradores?: BaseEntity[],
    ) {
    }

    public static tipoEquals(c1, c2) :boolean{
        return this.getTipo(c1) === this.getTipo(c2);
    }

    public static getTipo(t) :number{
        if (isNumber(t))
            return t;
        if (Status.VAZIA === t)
            return 0;
        if (Status.ABERTA === t)
            return 1;
        if (Status.FECHADA === t)
            return 2;
        if (Status.PAGA === t)
            return 3;
        if ("VAZIA".startsWith(t))
            return 0;
        if ("ABERTA".startsWith(t))
            return 1;
        if ("FECHADA".startsWith(t))
            return 2;
        if ("PAGA".startsWith(t))
            return 3;
        if (!isNullOrUndefined(t.tipo)) {
            return this.getTipo(t.tipo);
        }
        return -1;
    }

    public static getStatusString(status) :string{
        switch (Comanda.getTipo(status)) {
            case 0: return 'VAZIA';
            case 1: return 'ABERTA';
            case 2: return 'FECHADA';
            case 3: return 'PAGA';
        }
        return '';
    }

    public static isFechada(comanda :Comanda) :boolean{
        return Comanda.getTipo(comanda.status) > 1;
    }


}
