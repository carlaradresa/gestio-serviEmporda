import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { PlantillaFeinaService } from './plantilla-feina.service';

@Component({
  selector: 'jhi-plantilla-feina-delete-dialog',
  templateUrl: './plantilla-feina-delete-dialog.component.html'
})
export class PlantillaFeinaDeleteDialogComponent {
  plantillaFeina: IPlantillaFeina;

  constructor(
    protected plantillaFeinaService: PlantillaFeinaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.plantillaFeinaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'plantillaFeinaListModification',
        content: 'Deleted an plantillaFeina'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-plantilla-feina-delete-popup',
  template: ''
})
export class PlantillaFeinaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ plantillaFeina }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlantillaFeinaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.plantillaFeina = plantillaFeina;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/plantilla-feina', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/plantilla-feina', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
