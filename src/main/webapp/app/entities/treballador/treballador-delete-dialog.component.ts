import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITreballador } from 'app/shared/model/treballador.model';
import { TreballadorService } from './treballador.service';

@Component({
  selector: 'jhi-treballador-delete-dialog',
  templateUrl: './treballador-delete-dialog.component.html'
})
export class TreballadorDeleteDialogComponent {
  treballador: ITreballador;

  constructor(
    protected treballadorService: TreballadorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.treballadorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'treballadorListModification',
        content: 'Deleted an treballador'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-treballador-delete-popup',
  template: ''
})
export class TreballadorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ treballador }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TreballadorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.treballador = treballador;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/treballador', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/treballador', { outlets: { popup: null } }]);
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
