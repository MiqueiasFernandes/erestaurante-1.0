import { BaseEntity } from './../../shared';

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
}
