import { BaseEntity } from './../../shared';
import {isNumber} from "util";

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

    static tipoEquals(c1, c2) :boolean{
        return this.getDia(c1) === this.getDia(c2);
    }


    static getDia(d) :number{

        if (isNumber(d))
            return d;
        if (Dia.DOMINGO === d)
            return 0;
        if (Dia.SEGUNDA === d)
            return 1;
        if (Dia.TERCA === d)
            return 2;
        if (Dia.QUARTA === d)
            return 3;
        if (Dia.QUINTA === d)
            return 4;
        if (Dia.SEXTA === d)
            return 5;
        if (Dia.SABADO === d)
            return 6;
        if ('DOMINGO'.startsWith(d))
            return 0;
        if ('SEGUNDA'.startsWith(d))
            return 1;
        if ('TERCA'.startsWith(d))
            return 2;
        if ('QUARTA'.startsWith(d))
            return 3;
        if ('QUINTA'.startsWith(d))
            return 4;
        if ('SEXTA'.startsWith(d))
            return 5;
        if ('SABADO'.startsWith(d))
            return 6;
    }

    static getDiasInt() :number[] {
        return [0,1,2,3,4,5,6];
    }

    static getDiasString() :string[] {
        return [
            'DOMINGO',
            'SEGUNDA',
            'TERCA',
            'QUARTA',
            'QUINTA',
            'SEXTA',
            'SABADO'
        ];
    }

    static diaToString(dia: number) :string {
        return this.getDiasString()[dia];
    }

    static diaToInt(dia :string) :number{
        return this.getDiasString().indexOf(dia);
    }

    static diaToDia(dia :any) :Dia {
        switch (this.getDia(dia)) {
            case 0: return Dia.DOMINGO;
            case 1: return Dia.SEGUNDA;
            case 2: return Dia.TERCA;
            case 3: return Dia.QUARTA;
            case 4: return Dia.QUINTA;
            case 5: return Dia.SEXTA;
            case 6: return Dia.SABADO;
        }
    }
}
