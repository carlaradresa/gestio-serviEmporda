import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IFeina } from 'app/shared/model/feina.model';
import { FeinaService } from './feina.service';
import { FeinaDeleteDialogComponent } from './feina-delete-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

@Component({
  selector: 'jhi-feina',
  templateUrl: './feina.component.html'
})
export class FeinaComponent implements OnInit, OnDestroy {
  feinas: IFeina[];
  eventSubscriber?: Subscription;
  orderProp: string;
  filter: string;
  reverse: boolean;
  fromDate: string;
  toDate: string;
  page: number;
  predicate: any;
  routeData: any;
  totalItems: number;
  itemsPerPage: any;
  links: any;
  previousPage: any;

  constructor(
    protected feinaService: FeinaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private parseLinks: JhiParseLinks,
    private alertService: JhiAlertService,
    private router: Router
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    //  this.filter = '';
    //  this.orderProp = 'setmana';
    //  this.reverse = false;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data['pagingParams'].page;
      this.previousPage = data['pagingParams'].page;
      this.reverse = data['pagingParams'].ascending;
      this.predicate = data['pagingParams'].predicate;
    });
  }

  loadAll(): void {
    this.feinaService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IFeina[]>) => {
        this.feinas = res.body ? res.body : [];
      });
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
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
    this.router.navigate(['./feina'], {
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
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
