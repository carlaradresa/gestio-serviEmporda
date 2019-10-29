import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestioClientsTestModule } from '../../../test.module';
import { RepeticioTascaSetmanalComponent } from 'app/entities/repeticio-tasca-setmanal/repeticio-tasca-setmanal.component';
import { RepeticioTascaSetmanalService } from 'app/entities/repeticio-tasca-setmanal/repeticio-tasca-setmanal.service';
import { RepeticioTascaSetmanal } from 'app/shared/model/repeticio-tasca-setmanal.model';

describe('Component Tests', () => {
  describe('RepeticioTascaSetmanal Management Component', () => {
    let comp: RepeticioTascaSetmanalComponent;
    let fixture: ComponentFixture<RepeticioTascaSetmanalComponent>;
    let service: RepeticioTascaSetmanalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [RepeticioTascaSetmanalComponent],
        providers: []
      })
        .overrideTemplate(RepeticioTascaSetmanalComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepeticioTascaSetmanalComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepeticioTascaSetmanalService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RepeticioTascaSetmanal(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.repeticioTascaSetmanals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
