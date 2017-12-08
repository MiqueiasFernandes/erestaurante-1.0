import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Impressora } from './impressora.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {ImpressoraData} from "./impressora.data.model";

@Injectable()
export class ImpressoraService {

    private resourceUrl = SERVER_API_URL + 'api/impressoras';

    constructor(private http: Http) { }

    create(impressora: Impressora): Observable<Impressora> {
        const copy = this.convert(impressora);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(impressora: Impressora): Observable<Impressora> {
        const copy = this.convert(impressora);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Impressora> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findForNota(): Observable<Impressora> {
        return this.http.get(`${this.resourceUrl}/-1`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findForRelatorio(): Observable<Impressora> {
        return this.http.get(`${this.resourceUrl}/-2`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryPrints(ip: string): Observable<ImpressoraData[]> {
        return this.http.get(`${this.resourceUrl}/ip/${ip.split('.').join('-')}`)
            .map((res) => {
                return res.json();
            });
    }

    queryLocaisDeImpressao(): Observable<string[]> {
        return this.http.get(`${this.resourceUrl}/locais`)
            .map((res) => {
                return res.json();
            });
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
     * Convert a returned JSON object to Impressora.
     */
    private convertItemFromServer(json: any): Impressora {
        const entity: Impressora = Object.assign(new Impressora(), json);
        return entity;
    }

    /**
     * Convert a Impressora to a JSON which can be sent to the server.
     */
    private convert(impressora: Impressora): Impressora {
        const copy: Impressora = Object.assign({}, impressora);
        return copy;
    }
}
