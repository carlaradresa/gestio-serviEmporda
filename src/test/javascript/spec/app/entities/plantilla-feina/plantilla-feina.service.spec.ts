import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PlantillaFeinaService } from 'app/entities/plantilla-feina/plantilla-feina.service';
import { IPlantillaFeina, PlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { Dia } from 'app/shared/model/enumerations/dia.model';

describe('Service Tests', () => {
  describe('PlantillaFeina Service', () => {
    let injector: TestBed;
    let service: PlantillaFeinaService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlantillaFeina;
    let expectedResult: IPlantillaFeina | IPlantillaFeina[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PlantillaFeinaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PlantillaFeina(
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        0,
        Dia.DILLUNS,
        false,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            setmanaInicial: currentDate.format(DATE_FORMAT),
            setmanaFinal: currentDate.format(DATE_FORMAT),
            horaInici: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            tempsPrevist: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PlantillaFeina', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            setmanaInicial: currentDate.format(DATE_FORMAT),
            setmanaFinal: currentDate.format(DATE_FORMAT),
            horaInici: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            tempsPrevist: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            setmanaInicial: currentDate,
            setmanaFinal: currentDate,
            horaInici: currentDate,
            horaFinal: currentDate,
            tempsPrevist: currentDate
          },
          returnedFromService
        );

        service.create(new PlantillaFeina()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PlantillaFeina', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            setmanaInicial: currentDate.format(DATE_FORMAT),
            setmanaFinal: currentDate.format(DATE_FORMAT),
            horaInici: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            tempsPrevist: currentDate.format(DATE_TIME_FORMAT),
            intervalControl: 1,
            diaSetmana: 'BBBBBB',
            facturacioAutomatica: true,
            observacions: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            setmanaInicial: currentDate,
            setmanaFinal: currentDate,
            horaInici: currentDate,
            horaFinal: currentDate,
            tempsPrevist: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PlantillaFeina', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            setmanaInicial: currentDate.format(DATE_FORMAT),
            setmanaFinal: currentDate.format(DATE_FORMAT),
            horaInici: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            tempsPrevist: currentDate.format(DATE_TIME_FORMAT),
            intervalControl: 1,
            diaSetmana: 'BBBBBB',
            facturacioAutomatica: true,
            observacions: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            setmanaInicial: currentDate,
            setmanaFinal: currentDate,
            horaInici: currentDate,
            horaFinal: currentDate,
            tempsPrevist: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PlantillaFeina', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
