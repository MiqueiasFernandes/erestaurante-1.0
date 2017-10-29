import { BaseEntity, User } from './../../shared';

export class Colaborador implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public nascimento?: any,
        public sexomasculino?: boolean,
        public documento?: string,
        public telefone?: string,
        public email?: string,
        public horario?: string,
        public preferencia?: any,
        public usuario?: User,
        public endereco?: BaseEntity,
        public lancamentos?: BaseEntity[],
        public cargos?: BaseEntity[],
    ) {
        this.sexomasculino = false;
    }
}
