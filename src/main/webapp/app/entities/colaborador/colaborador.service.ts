import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiEventManager } from 'ng-jhipster';
import { JhiDateUtils } from 'ng-jhipster';

import { Colaborador } from './colaborador.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ColaboradorService {

    private resourceUrl = SERVER_API_URL + 'api/colaboradors';

    constructor(private http: Http, private dateUtils: JhiDateUtils,
                private eventManager: JhiEventManager,) { }


    public getCurrentColaborador():  Observable<Colaborador> {
        // return this.http.get(this.resourceUrl)
        //     .map((res: Response) => this.convertResponse(res, true)).map(
        //         (res: ResponseWrapper) => {
        //             let c: Colaborador;
        //             const cs: Colaborador[] = res.json;
        //             if (cs.length < 2){
        //                 c = cs[0];
        //             } else {
        //                 c = cs.find(col  => col.id < 0);
        //                 c.id = cs.find( col => col.usuario.id === c.usuario.id ).id;
        //             }
        //             return c;
        //         }
        //     )

        return this.find(-1);
    }

    create(colaborador: Colaborador): Observable<Colaborador> {
        const copy = this.convert(colaborador);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

  update(colaborador: Colaborador, nnootify? :boolean): Observable<Colaborador> {
        const copy = this.convert(colaborador);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();

            if(nnootify)
                return this.convertItemFromServer(jsonResponse);

            this.eventManager.broadcast({
                name: 'colaborador',
                content: 'update'
            });

            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Colaborador> {
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
        const jsonResponse :Colaborador[]= res.json();
        const result :Colaborador[] = [] ;
        for (let i = 0; i < jsonResponse.length; i++) {
            // if (current || (jsonResponse[i].id >= 0)){
                result.push(this.convertItemFromServer(jsonResponse[i]));
            // }
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Colaborador.
     */
    private convertItemFromServer(json: any): Colaborador {
        const entity: Colaborador = Object.assign(new Colaborador(), json);
        entity.nascimento = this.dateUtils
            .convertDateTimeFromServer(json.nascimento);
        return entity;
    }

    /**
     * Convert a Colaborador to a JSON which can be sent to the server.
     */
    private convert(colaborador: Colaborador): Colaborador {
        const copy: Colaborador = Object.assign({}, colaborador);

        copy.nascimento = this.dateUtils.toDate(colaborador.nascimento);
        return copy;
    }
}
