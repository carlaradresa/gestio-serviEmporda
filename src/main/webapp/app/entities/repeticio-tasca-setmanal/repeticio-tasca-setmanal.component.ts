import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IRepeticioTascaSetmanal } from 'app/shared/model/repeticio-tasca-setmanal.model';
import { AccountService } from 'app/core/auth/account.service';
import { RepeticioTascaSetmanalService } from './repeticio-tasca-setmanal.service';

@Component({
  selector: 'jhi-repeticio-tasca-setmanal',
  templateUrl: './repeticio-tasca-setmanal.component.html'
})
export class RepeticioTascaSetmanalComponent implements OnInit, OnDestroy {
  repeticioTascaSetmanals: IRepeticioTascaSetmanal[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected repeticioTascaSetmanalService: RepeticioTascaSetmanalService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.repeticioTascaSetmanalService
      .query()
      .pipe(
        filter((res: HttpResponse<IRepeticioTascaSetmanal[]>) => res.ok),
        map((res: HttpResponse<IRepeticioTascaSetmanal[]>) => res.body)
      )
      .subscribe((res: IRepeticioTascaSetmanal[]) => {
        this.repeticioTascaSetmanals = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRepeticioTascaSetmanals();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRepeticioTascaSetmanal) {
    return item.id;
  }

  registerChangeInRepeticioTascaSetmanals() {
    this.eventSubscriber = this.eventManager.subscribe('repeticioTascaSetmanalListModification', response => this.loadAll());
  }
}
