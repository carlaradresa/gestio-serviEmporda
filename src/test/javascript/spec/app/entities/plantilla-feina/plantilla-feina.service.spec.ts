import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PlantillaFeinaService } from 'app/entities/plantilla-feina/plantilla-feina.service';
import { IPlantillaFeina, PlantillaFeina } from 'app/shared/model/plantilla-feina.model';

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

      elemDefault = new PlantillaFeina(0, '', '', '00:00:00', '00:00:00', '00:00:00', false, 'AAAAAAA', currentDate, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            horaInici: '',
            horaFinal: '',
            setmanaInicial: currentDate.format(DATE_FORMAT),
            setmanaFinal: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PlantillaFeina', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            horaInici: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            setmanaInicial: currentDate.format(DATE_FORMAT),
            setmanaFinal: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            horaInici: currentDate,
            horaFinal: currentDate,
            setmanaInicial: currentDate,
            setmanaFinal: currentDate
          },
          returnedFromService
        );
        service
          .create(new PlantillaFeina())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PlantillaFeina', () => {
        const returnedFromService = Object.assign(
          {
            nomPlantilla: 'AAAA',
            descripcio: 'AAAA',
            horaInici: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            tempsPrevist: 'BBBBBB',
            facturacioAutomatica: true,
            observacions: 'BBBBBB',
            setmanaInicial: currentDate.format(DATE_FORMAT),
            setmanaFinal: currentDate.format(DATE_FORMAT),
            numeroControl: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaInici: currentDate,
            horaFinal: currentDate,
            setmanaInicial: currentDate,
            setmanaFinal: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PlantillaFeina', () => {
        const returnedFromService = Object.assign(
          {
            nomPlantilla: 'AAAA',
            descripcio: 'AAAA',
            horaInici: currentDate.format(DATE_TIME_FORMAT),
            horaFinal: currentDate.format(DATE_TIME_FORMAT),
            tempsPrevist: 'BBBBBB',
            facturacioAutomatica: true,
            observacions: 'BBBBBB',
            setmanaInicial: currentDate.format(DATE_FORMAT),
            setmanaFinal: currentDate.format(DATE_FORMAT),
            numeroControl: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            horaInici: currentDate,
            horaFinal: currentDate,
            setmanaInicial: currentDate,
            setmanaFinal: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
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
