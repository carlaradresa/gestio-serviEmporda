import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepeticioTascaSetmanal } from 'app/shared/model/repeticio-tasca-setmanal.model';
import { RepeticioTascaSetmanalService } from './repeticio-tasca-setmanal.service';

@Component({
  selector: 'jhi-repeticio-tasca-setmanal-delete-dialog',
  templateUrl: './repeticio-tasca-setmanal-delete-dialog.component.html'
})
export class RepeticioTascaSetmanalDeleteDialogComponent {
  repeticioTascaSetmanal: IRepeticioTascaSetmanal;

  constructor(
    protected repeticioTascaSetmanalService: RepeticioTascaSetmanalService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.repeticioTascaSetmanalService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'repeticioTascaSetmanalListModification',
        content: 'Deleted an repeticioTascaSetmanal'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-repeticio-tasca-setmanal-delete-popup',
  template: ''
})
export class RepeticioTascaSetmanalDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ repeticioTascaSetmanal }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RepeticioTascaSetmanalDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.repeticioTascaSetmanal = repeticioTascaSetmanal;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/repeticio-tasca-setmanal', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/repeticio-tasca-setmanal', { outlets: { popup: null } }]);
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
