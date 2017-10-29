import { BaseEntity } from './../../shared';

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
}
