import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestioClientsTestModule } from '../../../test.module';
import { VenedorDeleteDialogComponent } from 'app/entities/venedor/venedor-delete-dialog.component';
import { VenedorService } from 'app/entities/venedor/venedor.service';

describe('Component Tests', () => {
  describe('Venedor Management Delete Component', () => {
    let comp: VenedorDeleteDialogComponent;
    let fixture: ComponentFixture<VenedorDeleteDialogComponent>;
    let service: VenedorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [VenedorDeleteDialogComponent]
      })
        .overrideTemplate(VenedorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VenedorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VenedorService);
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
