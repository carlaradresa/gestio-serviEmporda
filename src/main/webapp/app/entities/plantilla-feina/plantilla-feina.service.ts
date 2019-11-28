import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';

type EntityResponseType = HttpResponse<IPlantillaFeina>;
type EntityArrayResponseType = HttpResponse<IPlantillaFeina[]>;

@Injectable({ providedIn: 'root' })
export class PlantillaFeinaService {
  public resourceUrl = SERVER_API_URL + 'api/plantilla-feinas';

  constructor(protected http: HttpClient) {}

  create(plantillaFeina: IPlantillaFeina): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plantillaFeina);
    return this.http
      .post<IPlantillaFeina>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(plantillaFeina: IPlantillaFeina): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plantillaFeina);
    return this.http
      .put<IPlantillaFeina>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlantillaFeina>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlantillaFeina[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(plantillaFeina: IPlantillaFeina): IPlantillaFeina {
    const copy: IPlantillaFeina = Object.assign({}, plantillaFeina, {
      horaInici: plantillaFeina.horaInici != null && plantillaFeina.horaInici.isValid() ? plantillaFeina.horaInici.toJSON() : null,
      horaFinal: plantillaFeina.horaFinal != null && plantillaFeina.horaFinal.isValid() ? plantillaFeina.horaFinal.toJSON() : null,
      setmanaInicial:
        plantillaFeina.setmanaInicial != null && plantillaFeina.setmanaInicial.isValid()
          ? plantillaFeina.setmanaInicial.format(DATE_FORMAT)
          : null,
      setmanaFinal:
        plantillaFeina.setmanaFinal != null && plantillaFeina.setmanaFinal.isValid()
          ? plantillaFeina.setmanaFinal.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.horaInici = res.body.horaInici != null ? moment(res.body.horaInici) : null;
      res.body.horaFinal = res.body.horaFinal != null ? moment(res.body.horaFinal) : null;
      res.body.setmanaInicial = res.body.setmanaInicial != null ? moment(res.body.setmanaInicial) : null;
      res.body.setmanaFinal = res.body.setmanaFinal != null ? moment(res.body.setmanaFinal) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((plantillaFeina: IPlantillaFeina) => {
        plantillaFeina.horaInici = plantillaFeina.horaInici != null ? moment(plantillaFeina.horaInici) : null;
        plantillaFeina.horaFinal = plantillaFeina.horaFinal != null ? moment(plantillaFeina.horaFinal) : null;
        plantillaFeina.setmanaInicial = plantillaFeina.setmanaInicial != null ? moment(plantillaFeina.setmanaInicial) : null;
        plantillaFeina.setmanaFinal = plantillaFeina.setmanaFinal != null ? moment(plantillaFeina.setmanaFinal) : null;
      });
    }
    return res;
  }
}
