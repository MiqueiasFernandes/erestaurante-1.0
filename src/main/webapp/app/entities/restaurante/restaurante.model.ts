import { BaseEntity } from './../../shared';

export class Restaurante implements BaseEntity {
    constructor(
        public id?: number,
        public razaoSocial?: string,
        public nomeFantasia?: string,
        public telefone?: string,
        public celular?: string,
        public email?: string,
        public site?: string,
        public cnpj?: string,
        public codigo?: string,
        public codigoSegContribuinte?: string,
        public licenca?: string,
        public funcadao?: any,
        public logoContentType?: string,
        public logo?: any,
        public pagina?: any,
        public localhost?: string,
        public endereco?: BaseEntity,
        public proprietarios?: BaseEntity[],
    ) {
    }
}
