import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Lancamento } from './lancamento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LancamentoService {

    private resourceUrl = SERVER_API_URL + 'api/lancamentos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(lancamento: Lancamento): Observable<Lancamento> {
        const copy = this.convert(lancamento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(lancamento: Lancamento): Observable<Lancamento> {
        const copy = this.convert(lancamento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Lancamento> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByComanda(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/comanda/${id}`)
            .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to Lancamento.
     */
    private convertItemFromServer(json: any): Lancamento {
        const entity: Lancamento = Object.assign(new Lancamento(), json);
        entity.data = this.dateUtils
            .convertDateTimeFromServer(json.data);
        entity.vencimento = this.dateUtils
            .convertDateTimeFromServer(json.vencimento);
        return entity;
    }

    /**
     * Convert a Lancamento to a JSON which can be sent to the server.
     */
    private convert(lancamento: Lancamento): Lancamento {
        const copy: Lancamento = Object.assign({}, lancamento);

        copy.data = this.dateUtils.toDate(lancamento.data);

        copy.vencimento = this.dateUtils.toDate(lancamento.vencimento);
        return copy;
    }
}
