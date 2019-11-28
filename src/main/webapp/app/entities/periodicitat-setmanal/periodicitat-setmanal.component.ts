import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';
import { PeriodicitatSetmanalService } from './periodicitat-setmanal.service';
import { PeriodicitatSetmanalDeleteDialogComponent } from './periodicitat-setmanal-delete-dialog.component';

@Component({
  selector: 'jhi-periodicitat-setmanal',
  templateUrl: './periodicitat-setmanal.component.html'
})
export class PeriodicitatSetmanalComponent implements OnInit, OnDestroy {
  periodicitatSetmanals: IPeriodicitatSetmanal[];
  eventSubscriber: Subscription;

  constructor(
    protected periodicitatSetmanalService: PeriodicitatSetmanalService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.periodicitatSetmanalService.query().subscribe((res: HttpResponse<IPeriodicitatSetmanal[]>) => {
      this.periodicitatSetmanals = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPeriodicitatSetmanals();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPeriodicitatSetmanal) {
    return item.id;
  }

  registerChangeInPeriodicitatSetmanals() {
    this.eventSubscriber = this.eventManager.subscribe('periodicitatSetmanalListModification', () => this.loadAll());
  }

  delete(periodicitatSetmanal: IPeriodicitatSetmanal) {
    const modalRef = this.modalService.open(PeriodicitatSetmanalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.periodicitatSetmanal = periodicitatSetmanal;
  }
}
