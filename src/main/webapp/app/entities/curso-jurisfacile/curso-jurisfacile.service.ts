import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CursoJurisfacile } from './curso-jurisfacile.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CursoJurisfacile>;

@Injectable()
export class CursoJurisfacileService {

    private resourceUrl =  SERVER_API_URL + 'api/cursos';

    constructor(private http: HttpClient) { }

    create(curso: CursoJurisfacile): Observable<EntityResponseType> {
        const copy = this.convert(curso);
        return this.http.post<CursoJurisfacile>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(curso: CursoJurisfacile): Observable<EntityResponseType> {
        const copy = this.convert(curso);
        return this.http.put<CursoJurisfacile>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CursoJurisfacile>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CursoJurisfacile[]>> {
        const options = createRequestOption(req);
        return this.http.get<CursoJurisfacile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CursoJurisfacile[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CursoJurisfacile = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CursoJurisfacile[]>): HttpResponse<CursoJurisfacile[]> {
        const jsonResponse: CursoJurisfacile[] = res.body;
        const body: CursoJurisfacile[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CursoJurisfacile.
     */
    private convertItemFromServer(curso: CursoJurisfacile): CursoJurisfacile {
        const copy: CursoJurisfacile = Object.assign({}, curso);
        return copy;
    }

    /**
     * Convert a CursoJurisfacile to a JSON which can be sent to the server.
     */
    private convert(curso: CursoJurisfacile): CursoJurisfacile {
        const copy: CursoJurisfacile = Object.assign({}, curso);
        return copy;
    }
}
