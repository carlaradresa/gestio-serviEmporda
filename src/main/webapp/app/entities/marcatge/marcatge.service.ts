import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMarcatge } from 'app/shared/model/marcatge.model';

type EntityResponseType = HttpResponse<IMarcatge>;
type EntityArrayResponseType = HttpResponse<IMarcatge[]>;

@Injectable({ providedIn: 'root' })
export class MarcatgeService {
  public resourceUrl = SERVER_API_URL + 'api/marcatges';

  constructor(protected http: HttpClient) {}

  create(marcatge: IMarcatge): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(marcatge);
    return this.http
      .post<IMarcatge>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(marcatge: IMarcatge): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(marcatge);
    return this.http
      .put<IMarcatge>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMarcatge>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMarcatge[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(marcatge: IMarcatge): IMarcatge {
    const copy: IMarcatge = Object.assign({}, marcatge, {
      horaEntrada: marcatge.horaEntrada != null && marcatge.horaEntrada.isValid() ? marcatge.horaEntrada.toJSON() : null,
      horaSortida: marcatge.horaSortida != null && marcatge.horaSortida.isValid() ? marcatge.horaSortida.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.horaEntrada = res.body.horaEntrada != null ? moment(res.body.horaEntrada) : null;
      res.body.horaSortida = res.body.horaSortida != null ? moment(res.body.horaSortida) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((marcatge: IMarcatge) => {
        marcatge.horaEntrada = marcatge.horaEntrada != null ? moment(marcatge.horaEntrada) : null;
        marcatge.horaSortida = marcatge.horaSortida != null ? moment(marcatge.horaSortida) : null;
      });
    }
    return res;
  }
}
