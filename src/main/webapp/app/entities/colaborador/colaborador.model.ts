import { BaseEntity, User } from './../../shared';
import {Cargo, CargoTipo} from "../cargo/cargo.model";

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

    public isAdmin() :boolean {
        return this.cargos.some((c :Cargo) => Cargo.comparar(c.tipo, CargoTipo.GERENCIA));
    }

    public isCaixa() :boolean {
        return this.cargos.some((c :Cargo) => Cargo.comparar(c.tipo, CargoTipo.CAIXA));
    }

    public isGarcon() :boolean {
        return this.cargos.some((c :Cargo) => Cargo.comparar(c.tipo, CargoTipo.ATENDIMENTO));
    }

    public isProducao() :boolean {
        return this.cargos.some((c :Cargo) => Cargo.comparar(c.tipo, CargoTipo.PRODUCAO));
    }

    public isEntrega() :boolean {
        return this.cargos.some((c :Cargo) => Cargo.comparar(c.tipo, CargoTipo.ENTREGA));
    }

    public getMaxCargo() :CargoTipo {
        if (this.isAdmin()) {
            return CargoTipo.GERENCIA;
        }
        if (this.isCaixa()) {
            return CargoTipo.CAIXA;
        }
        if (this.isGarcon()) {
            return CargoTipo.ATENDIMENTO;
        }
        if (this.isProducao()) {
            return CargoTipo.PRODUCAO;
        }
        if (this.isEntrega()) {
            return CargoTipo.ENTREGA;
        }
        return undefined;
    }
}
