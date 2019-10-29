import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestioClientsTestModule } from '../../../test.module';
import { PlantillaFeinaDeleteDialogComponent } from 'app/entities/plantilla-feina/plantilla-feina-delete-dialog.component';
import { PlantillaFeinaService } from 'app/entities/plantilla-feina/plantilla-feina.service';

describe('Component Tests', () => {
  describe('PlantillaFeina Management Delete Component', () => {
    let comp: PlantillaFeinaDeleteDialogComponent;
    let fixture: ComponentFixture<PlantillaFeinaDeleteDialogComponent>;
    let service: PlantillaFeinaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestioClientsTestModule],
        declarations: [PlantillaFeinaDeleteDialogComponent]
      })
        .overrideTemplate(PlantillaFeinaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlantillaFeinaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlantillaFeinaService);
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
