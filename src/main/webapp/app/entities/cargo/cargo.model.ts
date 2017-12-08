import { BaseEntity } from './../../shared';
import {isNullOrUndefined, isNumber} from "util";
import {Colaborador} from "../colaborador/colaborador.model";

export const enum CargoTipo {
    'GERENCIA',
    'PRODUCAO',
    'CAIXA',
    'ATENDIMENTO',
    'ENTREGA'
}

export class Cargo implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public salario?: number,
        public comissao?: number,
        public tipo?: CargoTipo,
        public permissao?: any,
    ) { }


    public compare(cargo) :boolean {
        return Cargo.comparar(this.tipo, cargo);
    }

    public static comparar(cargo1, cargo2) :boolean {
        return Cargo.tipoEquals(cargo1, cargo2);
    }

    static tipoEquals(c1, c2) :boolean{
        return this.getTipo(c1) === this.getTipo(c2);
    }


    static getTipo(t) :number{
        if (isNumber(t))
            return t;
        if (CargoTipo.GERENCIA === t)
            return 0;
        if (CargoTipo.PRODUCAO === t)
            return 1;
        if (CargoTipo.CAIXA === t)
            return 2;
        if (CargoTipo.ATENDIMENTO === t)
            return 3;
        if (CargoTipo.ENTREGA === t)
            return 4;
        if ("GERENCIA".startsWith(t))
            return 0;
        if ("PRODUCAO".startsWith(t))
            return 1;
        if ("CAIXA".startsWith(t))
            return 2;
        if ("ATENDIMENTO".startsWith(t))
            return 3;
        if ("ENTREGA".startsWith(t))
            return 4;
        if (!isNullOrUndefined(t.tipo)) {
            return this.getTipo(t.tipo);
        }
        return -1;
    }


    public static getCargoString(cargo) :string {
        return [
            'GERENCIA',
            'PRODUCAO',
            'CAIXA',
            'ATENDIMENTO',
            'ENTREGA'
        ][(Cargo.getTipo(cargo))];
    }

    public static contains(colaborador :Colaborador, cargo) :boolean {
        return colaborador.cargos.some(c => this.tipoEquals(c, cargo));

    }

}
