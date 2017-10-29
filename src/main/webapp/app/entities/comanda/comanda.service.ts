import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Comanda } from './comanda.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ComandaService {

    private resourceUrl = SERVER_API_URL + 'api/comandas';

    constructor(private http: Http) { }

    create(comanda: Comanda): Observable<Comanda> {
        const copy = this.convert(comanda);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(comanda: Comanda): Observable<Comanda> {
        const copy = this.convert(comanda);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Comanda> {
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
     * Convert a returned JSON object to Comanda.
     */
    private convertItemFromServer(json: any): Comanda {
        const entity: Comanda = Object.assign(new Comanda(), json);
        return entity;
    }

    /**
     * Convert a Comanda to a JSON which can be sent to the server.
     */
    private convert(comanda: Comanda): Comanda {
        const copy: Comanda = Object.assign({}, comanda);
        return copy;
    }
}
