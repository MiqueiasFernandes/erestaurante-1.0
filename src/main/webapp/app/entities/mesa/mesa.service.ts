import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Mesa } from './mesa.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MesaService {

    private resourceUrl = SERVER_API_URL + 'api/mesas';

    constructor(private http: Http) { }

    create(mesa: Mesa): Observable<Mesa> {
        const copy = this.convert(mesa);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(mesa: Mesa): Observable<Mesa> {
        const copy = this.convert(mesa);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Mesa> {
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
     * Convert a returned JSON object to Mesa.
     */
    private convertItemFromServer(json: any): Mesa {
        const entity: Mesa = Object.assign(new Mesa(), json);
        return entity;
    }

    /**
     * Convert a Mesa to a JSON which can be sent to the server.
     */
    private convert(mesa: Mesa): Mesa {
        const copy: Mesa = Object.assign({}, mesa);
        return copy;
    }
}
