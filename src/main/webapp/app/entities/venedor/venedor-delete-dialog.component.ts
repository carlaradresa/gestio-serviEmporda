import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVenedor } from 'app/shared/model/venedor.model';
import { VenedorService } from './venedor.service';

@Component({
  selector: 'jhi-venedor-delete-dialog',
  templateUrl: './venedor-delete-dialog.component.html'
})
export class VenedorDeleteDialogComponent {
  venedor: IVenedor;

  constructor(protected venedorService: VenedorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.venedorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'venedorListModification',
        content: 'Deleted an venedor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-venedor-delete-popup',
  template: ''
})
export class VenedorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ venedor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VenedorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.venedor = venedor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/venedor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/venedor', { outlets: { popup: null } }]);
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
