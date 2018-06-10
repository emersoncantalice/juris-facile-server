import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DisciplinaJurisfacile } from './disciplina-jurisfacile.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DisciplinaJurisfacile>;

@Injectable()
export class DisciplinaJurisfacileService {

    private resourceUrl =  SERVER_API_URL + 'api/disciplinas';

    constructor(private http: HttpClient) { }

    create(disciplina: DisciplinaJurisfacile): Observable<EntityResponseType> {
        const copy = this.convert(disciplina);
        return this.http.post<DisciplinaJurisfacile>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(disciplina: DisciplinaJurisfacile): Observable<EntityResponseType> {
        const copy = this.convert(disciplina);
        return this.http.put<DisciplinaJurisfacile>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DisciplinaJurisfacile>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DisciplinaJurisfacile[]>> {
        const options = createRequestOption(req);
        return this.http.get<DisciplinaJurisfacile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DisciplinaJurisfacile[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DisciplinaJurisfacile = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DisciplinaJurisfacile[]>): HttpResponse<DisciplinaJurisfacile[]> {
        const jsonResponse: DisciplinaJurisfacile[] = res.body;
        const body: DisciplinaJurisfacile[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DisciplinaJurisfacile.
     */
    private convertItemFromServer(disciplina: DisciplinaJurisfacile): DisciplinaJurisfacile {
        const copy: DisciplinaJurisfacile = Object.assign({}, disciplina);
        return copy;
    }

    /**
     * Convert a DisciplinaJurisfacile to a JSON which can be sent to the server.
     */
    private convert(disciplina: DisciplinaJurisfacile): DisciplinaJurisfacile {
        const copy: DisciplinaJurisfacile = Object.assign({}, disciplina);
        return copy;
    }
}
