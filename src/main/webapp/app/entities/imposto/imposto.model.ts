import { BaseEntity } from './../../shared';

export class Imposto implements BaseEntity {
    constructor(
        public id?: number,
        public descricao?: string,
        public ivTotTrib?: number,
        public iICMS?: number,
        public iIPI?: number,
        public iII?: number,
        public iISSQN?: number,
        public iPIS?: number,
        public iPISST?: number,
        public iCOFINS?: number,
        public iCOFINSST?: number,
        public iICMSUFDest?: number,
        public ioutros?: string,
        public configurar?: string,
    ) {
    }
}
