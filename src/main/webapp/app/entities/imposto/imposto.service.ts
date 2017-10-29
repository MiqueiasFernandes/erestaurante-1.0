import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Imposto } from './imposto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ImpostoService {

    private resourceUrl = SERVER_API_URL + 'api/impostos';

    constructor(private http: Http) { }

    create(imposto: Imposto): Observable<Imposto> {
        const copy = this.convert(imposto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(imposto: Imposto): Observable<Imposto> {
        const copy = this.convert(imposto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Imposto> {
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
     * Convert a returned JSON object to Imposto.
     */
    private convertItemFromServer(json: any): Imposto {
        const entity: Imposto = Object.assign(new Imposto(), json);
        return entity;
    }

    /**
     * Convert a Imposto to a JSON which can be sent to the server.
     */
    private convert(imposto: Imposto): Imposto {
        const copy: Imposto = Object.assign({}, imposto);
        return copy;
    }
}
