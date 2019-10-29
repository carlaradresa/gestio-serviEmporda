import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestioClientsTestModule } from '../../../test.module';
import { TreballadorDeleteDialogComponent } from 'app/entities/treballador/treballador-delete-dialog.component';
import { TreballadorService } from 'app/entities/treballador/treballador.service';

describe('Component Tests', () => {
  describe('Treballador Management Delete Component', () => {
    let comp: TreballadorDeleteDialogComponent;
    let fixture: ComponentFixture<TreballadorDeleteDialogComponent>;
    let service: TreballadorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [TreballadorDeleteDialogComponent]
      })
        .overrideTemplate(TreballadorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TreballadorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TreballadorService);
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
