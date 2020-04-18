import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestioClientsTestModule } from '../../../test.module';
import { RepeticioTascaSetmanalUpdateComponent } from 'app/entities/repeticio-tasca-setmanal/repeticio-tasca-setmanal-update.component';
import { RepeticioTascaSetmanalService } from 'app/entities/repeticio-tasca-setmanal/repeticio-tasca-setmanal.service';
import { RepeticioTascaSetmanal } from 'app/shared/model/repeticio-tasca-setmanal.model';

describe('Component Tests', () => {
  describe('RepeticioTascaSetmanal Management Update Component', () => {
    let comp: RepeticioTascaSetmanalUpdateComponent;
    let fixture: ComponentFixture<RepeticioTascaSetmanalUpdateComponent>;
    let service: RepeticioTascaSetmanalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [RepeticioTascaSetmanalUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RepeticioTascaSetmanalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepeticioTascaSetmanalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepeticioTascaSetmanalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RepeticioTascaSetmanal(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RepeticioTascaSetmanal();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
