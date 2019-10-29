import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IUbicacio } from 'app/shared/model/ubicacio.model';
import { AccountService } from 'app/core/auth/account.service';
import { UbicacioService } from './ubicacio.service';

@Component({
  selector: 'jhi-ubicacio',
  templateUrl: './ubicacio.component.html'
})
export class UbicacioComponent implements OnInit, OnDestroy {
  ubicacios: IUbicacio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ubicacioService: UbicacioService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ubicacioService
      .query()
      .pipe(
        filter((res: HttpResponse<IUbicacio[]>) => res.ok),
        map((res: HttpResponse<IUbicacio[]>) => res.body)
      )
      .subscribe((res: IUbicacio[]) => {
        this.ubicacios = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUbicacios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUbicacio) {
    return item.id;
  }

  registerChangeInUbicacios() {
    this.eventSubscriber = this.eventManager.subscribe('ubicacioListModification', response => this.loadAll());
  }
}
