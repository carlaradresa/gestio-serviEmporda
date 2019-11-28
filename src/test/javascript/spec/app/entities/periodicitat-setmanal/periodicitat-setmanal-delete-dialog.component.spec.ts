import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestioClientsTestModule } from '../../../test.module';
import { PeriodicitatSetmanalDeleteDialogComponent } from 'app/entities/periodicitat-setmanal/periodicitat-setmanal-delete-dialog.component';
import { PeriodicitatSetmanalService } from 'app/entities/periodicitat-setmanal/periodicitat-setmanal.service';

describe('Component Tests', () => {
  describe('PeriodicitatSetmanal Management Delete Component', () => {
    let comp: PeriodicitatSetmanalDeleteDialogComponent;
    let fixture: ComponentFixture<PeriodicitatSetmanalDeleteDialogComponent>;
    let service: PeriodicitatSetmanalService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [PeriodicitatSetmanalDeleteDialogComponent]
      })
        .overrideTemplate(PeriodicitatSetmanalDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PeriodicitatSetmanalDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PeriodicitatSetmanalService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
