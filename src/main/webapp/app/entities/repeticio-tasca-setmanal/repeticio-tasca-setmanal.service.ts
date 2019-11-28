import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRepeticioTascaSetmanal } from 'app/shared/model/repeticio-tasca-setmanal.model';

type EntityResponseType = HttpResponse<IRepeticioTascaSetmanal>;
type EntityArrayResponseType = HttpResponse<IRepeticioTascaSetmanal[]>;

@Injectable({ providedIn: 'root' })
export class RepeticioTascaSetmanalService {
  public resourceUrl = SERVER_API_URL + 'api/repeticio-tasca-setmanals';

  constructor(protected http: HttpClient) {}

  create(repeticioTascaSetmanal: IRepeticioTascaSetmanal): Observable<EntityResponseType> {
    return this.http.post<IRepeticioTascaSetmanal>(this.resourceUrl, repeticioTascaSetmanal, { observe: 'response' });
  }

  update(repeticioTascaSetmanal: IRepeticioTascaSetmanal): Observable<EntityResponseType> {
    return this.http.put<IRepeticioTascaSetmanal>(this.resourceUrl, repeticioTascaSetmanal, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepeticioTascaSetmanal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRepeticioTascaSetmanal[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
