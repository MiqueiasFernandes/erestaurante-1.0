import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import {Cardapio, Dia} from './cardapio.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CardapioService {

    private resourceUrl = SERVER_API_URL + 'api/cardapios';

    constructor(private http: Http) { }

    create(cardapio: Cardapio): Observable<Cardapio> {
        const copy = this.convert(cardapio);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(cardapio: Cardapio): Observable<Cardapio> {
        const copy = this.convert(cardapio);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Cardapio> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Cardapio.
     */
    private convertItemFromServer(json: any): Cardapio {
        const entity: Cardapio = Object.assign(new Cardapio(), json);
        return entity;
    }

    /**
     * Convert a Cardapio to a JSON which can be sent to the server.
     */
    private convert(cardapio: Cardapio): Cardapio {
        const copy: Cardapio = Object.assign({}, cardapio);
        return copy;
    }


    getCardapioOfDay(dia: Dia) :Observable<Cardapio> {
        return this.query().map((res: ResponseWrapper) => {
            const cardapios :Cardapio[] = res.json;
           return cardapios.find( c => Cardapio.tipoEquals(c.dia, dia) && c.habilitar);
        });
    }
}
