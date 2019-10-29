import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMarcatge } from 'app/shared/model/marcatge.model';
import { MarcatgeService } from './marcatge.service';

@Component({
  selector: 'jhi-marcatge-delete-dialog',
  templateUrl: './marcatge-delete-dialog.component.html'
})
export class MarcatgeDeleteDialogComponent {
  marcatge: IMarcatge;

  constructor(protected marcatgeService: MarcatgeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.marcatgeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'marcatgeListModification',
        content: 'Deleted an marcatge'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-marcatge-delete-popup',
  template: ''
})
export class MarcatgeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ marcatge }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MarcatgeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.marcatge = marcatge;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/marcatge', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/marcatge', { outlets: { popup: null } }]);
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
