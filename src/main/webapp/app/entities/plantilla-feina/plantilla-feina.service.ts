import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
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

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(plantillaFeina: IPlantillaFeina): IPlantillaFeina {
    const copy: IPlantillaFeina = Object.assign({}, plantillaFeina, {
      setmanaInicial:
        plantillaFeina.setmanaInicial && plantillaFeina.setmanaInicial.isValid()
          ? plantillaFeina.setmanaInicial.format(DATE_FORMAT)
          : undefined,
      setmanaFinal:
        plantillaFeina.setmanaFinal && plantillaFeina.setmanaFinal.isValid() ? plantillaFeina.setmanaFinal.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.setmanaInicial = res.body.setmanaInicial ? moment(res.body.setmanaInicial) : undefined;
      res.body.setmanaFinal = res.body.setmanaFinal ? moment(res.body.setmanaFinal) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((plantillaFeina: IPlantillaFeina) => {
        plantillaFeina.setmanaInicial = plantillaFeina.setmanaInicial ? moment(plantillaFeina.setmanaInicial) : undefined;
        plantillaFeina.setmanaFinal = plantillaFeina.setmanaFinal ? moment(plantillaFeina.setmanaFinal) : undefined;
      });
    }
    return res;
  }
}
