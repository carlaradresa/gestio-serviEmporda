import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUbicacio } from 'app/shared/model/ubicacio.model';
import { UbicacioService } from './ubicacio.service';

@Component({
  selector: 'jhi-ubicacio-delete-dialog',
  templateUrl: './ubicacio-delete-dialog.component.html'
})
export class UbicacioDeleteDialogComponent {
  ubicacio: IUbicacio;

  constructor(protected ubicacioService: UbicacioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ubicacioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ubicacioListModification',
        content: 'Deleted an ubicacio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ubicacio-delete-popup',
  template: ''
})
export class UbicacioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ubicacio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UbicacioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ubicacio = ubicacio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ubicacio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ubicacio', { outlets: { popup: null } }]);
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
