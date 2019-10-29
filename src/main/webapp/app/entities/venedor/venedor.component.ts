import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IVenedor } from 'app/shared/model/venedor.model';
import { AccountService } from 'app/core/auth/account.service';
import { VenedorService } from './venedor.service';

@Component({
  selector: 'jhi-venedor',
  templateUrl: './venedor.component.html'
})
export class VenedorComponent implements OnInit, OnDestroy {
  venedors: IVenedor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected venedorService: VenedorService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.venedorService
      .query()
      .pipe(
        filter((res: HttpResponse<IVenedor[]>) => res.ok),
        map((res: HttpResponse<IVenedor[]>) => res.body)
      )
      .subscribe((res: IVenedor[]) => {
        this.venedors = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVenedors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVenedor) {
    return item.id;
  }

  registerChangeInVenedors() {
    this.eventSubscriber = this.eventManager.subscribe('venedorListModification', response => this.loadAll());
  }
}
