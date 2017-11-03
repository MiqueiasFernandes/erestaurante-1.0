import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import {Venda, VendaStatus} from './venda.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class VendaService {

    private resourceUrl = SERVER_API_URL + 'api/vendas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(venda: Venda): Observable<Venda> {
        const copy = this.convert(venda);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(venda: Venda): Observable<Venda> {
        const copy = this.convert(venda);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Venda> {
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

    getVendasForComandaId(id :number, modo? :string): Observable<Venda[]>  {

        if (!modo) {
            modo = Venda.getAllToString().join(',');
        }

        return this.http.get(`${this.resourceUrl}/comanda/${id}/${modo}`)
            .map((res: Response) => this.convertResponse(res).json);
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
     * Convert a returned JSON object to Venda.
     */
    private convertItemFromServer(json: any): Venda {
        const entity: Venda = Object.assign(new Venda(), json);
        entity.data = this.dateUtils
            .convertDateTimeFromServer(json.data);
        return entity;
    }

    /**
     * Convert a Venda to a JSON which can be sent to the server.
     */
    private convert(venda: Venda): Venda {
        const copy: Venda = Object.assign({}, venda);

        copy.data = this.dateUtils.toDate(venda.data);
        return copy;
    }
}
