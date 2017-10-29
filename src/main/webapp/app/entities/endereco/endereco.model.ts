import { BaseEntity } from './../../shared';

export class Endereco implements BaseEntity {
    constructor(
        public id?: number,
        public pais?: string,
        public estado?: string,
        public cidade?: string,
        public bairro?: string,
        public logradouro?: string,
        public local?: string,
        public cep?: string,
        public numero?: number,
        public complemento?: string,
    ) {
    }
}
