import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TermoJurisfacile } from './termo-jurisfacile.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TermoJurisfacile>;

@Injectable()
export class TermoJurisfacileService {

    private resourceUrl =  SERVER_API_URL + 'api/termos';

    constructor(private http: HttpClient) { }

    create(termo: TermoJurisfacile): Observable<EntityResponseType> {
        const copy = this.convert(termo);
        return this.http.post<TermoJurisfacile>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(termo: TermoJurisfacile): Observable<EntityResponseType> {
        const copy = this.convert(termo);
        return this.http.put<TermoJurisfacile>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TermoJurisfacile>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TermoJurisfacile[]>> {
        const options = createRequestOption(req);
        return this.http.get<TermoJurisfacile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TermoJurisfacile[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TermoJurisfacile = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TermoJurisfacile[]>): HttpResponse<TermoJurisfacile[]> {
        const jsonResponse: TermoJurisfacile[] = res.body;
        const body: TermoJurisfacile[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TermoJurisfacile.
     */
    private convertItemFromServer(termo: TermoJurisfacile): TermoJurisfacile {
        const copy: TermoJurisfacile = Object.assign({}, termo);
        return copy;
    }

    /**
     * Convert a TermoJurisfacile to a JSON which can be sent to the server.
     */
    private convert(termo: TermoJurisfacile): TermoJurisfacile {
        const copy: TermoJurisfacile = Object.assign({}, termo);
        return copy;
    }
}
