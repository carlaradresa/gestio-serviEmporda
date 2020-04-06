import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeriodicitatConfigurableService } from 'app/entities/periodicitat-configurable/periodicitat-configurable.service';
import { IPeriodicitatConfigurable, PeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { Periodicitat } from 'app/shared/model/enumerations/periodicitat.model';

describe('Service Tests', () => {
  describe('PeriodicitatConfigurable Service', () => {
    let injector: TestBed;
    let service: PeriodicitatConfigurableService;
    let httpMock: HttpTestingController;
    let elemDefault: IPeriodicitatConfigurable;
    let expectedResult: IPeriodicitatConfigurable | IPeriodicitatConfigurable[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PeriodicitatConfigurableService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PeriodicitatConfigurable(0, Periodicitat.DIA, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PeriodicitatConfigurable', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PeriodicitatConfigurable()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PeriodicitatConfigurable', () => {
        const returnedFromService = Object.assign(
          {
            periodicitat: 'BBBBBB',
            frequencia: 1,
            observacions: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PeriodicitatConfigurable', () => {
        const returnedFromService = Object.assign(
          {
            periodicitat: 'BBBBBB',
            frequencia: 1,
            observacions: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PeriodicitatConfigurable', () => {
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
