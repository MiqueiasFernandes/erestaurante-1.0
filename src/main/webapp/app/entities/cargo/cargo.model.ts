import { BaseEntity } from './../../shared';

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
    ) {
    }
}
