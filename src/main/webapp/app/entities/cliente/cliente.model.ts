import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public cpf?: string,
        public cnpj?: string,
        public telefone?: string,
        public email?: string,
        public observacoes?: string,
        public endereco?: BaseEntity,
    ) {
    }
}
