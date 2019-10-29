import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestioClientsTestModule } from '../../../test.module';
import { RepeticioTascaSetmanalDetailComponent } from 'app/entities/repeticio-tasca-setmanal/repeticio-tasca-setmanal-detail.component';
import { RepeticioTascaSetmanal } from 'app/shared/model/repeticio-tasca-setmanal.model';

describe('Component Tests', () => {
  describe('RepeticioTascaSetmanal Management Detail Component', () => {
    let comp: RepeticioTascaSetmanalDetailComponent;
    let fixture: ComponentFixture<RepeticioTascaSetmanalDetailComponent>;
    const route = ({ data: of({ repeticioTascaSetmanal: new RepeticioTascaSetmanal(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [RepeticioTascaSetmanalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RepeticioTascaSetmanalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepeticioTascaSetmanalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.repeticioTascaSetmanal).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
