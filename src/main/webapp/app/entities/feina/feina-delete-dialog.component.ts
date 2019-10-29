import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFeina } from 'app/shared/model/feina.model';
import { FeinaService } from './feina.service';

@Component({
  selector: 'jhi-feina-delete-dialog',
  templateUrl: './feina-delete-dialog.component.html'
})
export class FeinaDeleteDialogComponent {
  feina: IFeina;

  constructor(protected feinaService: FeinaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.feinaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'feinaListModification',
        content: 'Deleted an feina'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-feina-delete-popup',
  template: ''
})
export class FeinaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ feina }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FeinaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.feina = feina;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/feina', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/feina', { outlets: { popup: null } }]);
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
