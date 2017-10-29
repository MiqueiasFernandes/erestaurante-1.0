import { BaseEntity } from './../../shared';

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
}
