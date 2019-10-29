import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestioClientsTestModule } from '../../../test.module';
import { MarcatgeDeleteDialogComponent } from 'app/entities/marcatge/marcatge-delete-dialog.component';
import { MarcatgeService } from 'app/entities/marcatge/marcatge.service';

describe('Component Tests', () => {
  describe('Marcatge Management Delete Component', () => {
    let comp: MarcatgeDeleteDialogComponent;
    let fixture: ComponentFixture<MarcatgeDeleteDialogComponent>;
    let service: MarcatgeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [MarcatgeDeleteDialogComponent]
      })
        .overrideTemplate(MarcatgeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MarcatgeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MarcatgeService);
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
