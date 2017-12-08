import { BaseEntity } from './../../shared';

export class Impressora implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public codigo?: string,
        public prioridade?: number,
        public script?: any,
        public local?: string,
    ) {
    }
}
