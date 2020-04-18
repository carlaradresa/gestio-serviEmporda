import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestioClientsTestModule } from '../../../test.module';
import { RepeticioTascaSetmanalDeleteDialogComponent } from 'app/entities/repeticio-tasca-setmanal/repeticio-tasca-setmanal-delete-dialog.component';
import { RepeticioTascaSetmanalService } from 'app/entities/repeticio-tasca-setmanal/repeticio-tasca-setmanal.service';

describe('Component Tests', () => {
  describe('RepeticioTascaSetmanal Management Delete Component', () => {
    let comp: RepeticioTascaSetmanalDeleteDialogComponent;
    let fixture: ComponentFixture<RepeticioTascaSetmanalDeleteDialogComponent>;
    let service: RepeticioTascaSetmanalService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [RepeticioTascaSetmanalDeleteDialogComponent]
      })
        .overrideTemplate(RepeticioTascaSetmanalDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepeticioTascaSetmanalDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepeticioTascaSetmanalService);
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
