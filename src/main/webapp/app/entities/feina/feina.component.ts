import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFeina } from 'app/shared/model/feina.model';
import { FeinaService } from './feina.service';
import { FeinaDeleteDialogComponent } from './feina-delete-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-feina',
  templateUrl: './feina.component.html'
})
export class FeinaComponent implements OnInit, OnDestroy {
  feinas?: IFeina[];
  eventSubscriber?: Subscription;
  orderProp: string;
  filter: string;
  reverse: boolean;
  fromDate: string;
  toDate: string;
  page: number;
  predicate: any;
  routeData: any;

  constructor(
    protected feinaService: FeinaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.filter = '';
    this.orderProp = 'setmana';
    this.reverse = false;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data['pagingParams'].page;
      this.reverse = data['pagingParams'].ascending;
      this.predicate = data['pagingParams'].predicate;
    });
  }

  loadAll(): void {
    this.feinaService.query().subscribe((res: HttpResponse<IFeina[]>) => {
      this.feinas = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFeinas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFeina): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFeinas(): void {
    this.eventSubscriber = this.eventManager.subscribe('feinaListModification', () => this.loadAll());
  }

  delete(feina: IFeina): void {
    const modalRef = this.modalService.open(FeinaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.feina = feina;
  }
  transition() {
    this.router.navigate(['/entitites/feina'], {
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  getBadgeClass(statusState) {
    if (statusState === 'ACTIU') {
      return 'badge-info';
    } else {
      if (statusState === 'INACTIU') {
        return 'badge-danger';
      } else {
        return 'badge-success';
      }
    }
  }
}
