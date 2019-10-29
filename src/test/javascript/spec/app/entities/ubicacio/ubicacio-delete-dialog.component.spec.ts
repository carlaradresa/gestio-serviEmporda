import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestioClientsTestModule } from '../../../test.module';
import { UbicacioDeleteDialogComponent } from 'app/entities/ubicacio/ubicacio-delete-dialog.component';
import { UbicacioService } from 'app/entities/ubicacio/ubicacio.service';

describe('Component Tests', () => {
  describe('Ubicacio Management Delete Component', () => {
    let comp: UbicacioDeleteDialogComponent;
    let fixture: ComponentFixture<UbicacioDeleteDialogComponent>;
    let service: UbicacioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [UbicacioDeleteDialogComponent]
      })
        .overrideTemplate(UbicacioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UbicacioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UbicacioService);
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
