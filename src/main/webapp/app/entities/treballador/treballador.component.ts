import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITreballador } from 'app/shared/model/treballador.model';
import { TreballadorService } from './treballador.service';
import { TreballadorDeleteDialogComponent } from './treballador-delete-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-treballador',
  templateUrl: './treballador.component.html'
})
export class TreballadorComponent implements OnInit, OnDestroy {
  treballadors?: ITreballador[];
  eventSubscriber?: Subscription;
  predicate: any;
  reverse: any;
  page: any;
  routeData: Subscription;

  constructor(
    protected treballadorService: TreballadorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll(): void {
    this.treballadorService
      .query({
        page: this.page - 1,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITreballador[]>) => {
        this.treballadors = res.body ? res.body : [];
      });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTreballadors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITreballador): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  transition() {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  registerChangeInTreballadors(): void {
    this.eventSubscriber = this.eventManager.subscribe('treballadorListModification', () => this.loadAll());
  }

  delete(treballador: ITreballador): void {
    const modalRef = this.modalService.open(TreballadorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.treballador = treballador;
  }
}
