import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TemaJurisfacile } from './tema-jurisfacile.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TemaJurisfacile>;

@Injectable()
export class TemaJurisfacileService {

    private resourceUrl =  SERVER_API_URL + 'api/temas';

    constructor(private http: HttpClient) { }

    create(tema: TemaJurisfacile): Observable<EntityResponseType> {
        const copy = this.convert(tema);
        return this.http.post<TemaJurisfacile>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tema: TemaJurisfacile): Observable<EntityResponseType> {
        const copy = this.convert(tema);
        return this.http.put<TemaJurisfacile>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TemaJurisfacile>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TemaJurisfacile[]>> {
        const options = createRequestOption(req);
        return this.http.get<TemaJurisfacile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TemaJurisfacile[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TemaJurisfacile = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TemaJurisfacile[]>): HttpResponse<TemaJurisfacile[]> {
        const jsonResponse: TemaJurisfacile[] = res.body;
        const body: TemaJurisfacile[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TemaJurisfacile.
     */
    private convertItemFromServer(tema: TemaJurisfacile): TemaJurisfacile {
        const copy: TemaJurisfacile = Object.assign({}, tema);
        return copy;
    }

    /**
     * Convert a TemaJurisfacile to a JSON which can be sent to the server.
     */
    private convert(tema: TemaJurisfacile): TemaJurisfacile {
        const copy: TemaJurisfacile = Object.assign({}, tema);
        return copy;
    }
}
