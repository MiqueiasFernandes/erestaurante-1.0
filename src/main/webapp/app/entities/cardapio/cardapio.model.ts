import { BaseEntity } from './../../shared';

export const enum Dia {
    'DOMINGO',
    'SEGUNDA',
    'TERCA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SABADO'
}

export class Cardapio implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public dia?: Dia,
        public periodo?: string,
        public disposicao?: string,
        public html?: any,
        public habilitar?: boolean,
        public produtos?: BaseEntity[],
    ) {
        this.habilitar = false;
    }
}
