import { BaseEntity } from './../../shared';

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
}
