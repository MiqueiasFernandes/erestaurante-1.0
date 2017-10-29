import { BaseEntity } from './../../shared';

export class Nota implements BaseEntity {
    constructor(
        public id?: number,
        public nfIDENT?: string,
        public qrcode?: string,
        public codigo?: string,
        public identificador?: string,
        public versao?: string,
        public nfNotaInfoIdentificacao?: string,
        public nfNotaInfoEmitente?: string,
        public nfNotaInfoAvulsa?: string,
        public nfNotaInfoDestinatario?: string,
        public nfNotaInfoLocal?: string,
        public nfPessoaAutorizadaDownloadNFe?: string,
        public itens?: string,
        public nfNotaInfoTotal?: string,
        public nfNotaInfoTransporte?: string,
        public nfNotaInfoCobranca?: string,
        public nfNotaInfoPagamento?: string,
        public nfNotaInfoInformacoesAdicionais?: string,
        public nfNotaInfoExportacao?: string,
        public nfNotaInfoCompra?: string,
        public nfNotaInfoCana?: string,
        public xml?: any,
        public danfe?: any,
        public qrcodeImageContentType?: string,
        public qrcodeImage?: any,
        public imposto?: BaseEntity,
    ) {
    }
}
