import { BaseEntity } from './../../shared';

export class Mesa implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public local?: number,
        public descricao?: string,
        public qrcodeContentType?: string,
        public qrcode?: any,
    ) {
    }
}
