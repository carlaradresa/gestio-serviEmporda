import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITreballador } from 'app/shared/model/treballador.model';
import { AccountService } from 'app/core/auth/account.service';
import { TreballadorService } from './treballador.service';

@Component({
  selector: 'jhi-treballador',
  templateUrl: './treballador.component.html'
})
export class TreballadorComponent implements OnInit, OnDestroy {
  treballadors: ITreballador[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected treballadorService: TreballadorService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.treballadorService
      .query()
      .pipe(
        filter((res: HttpResponse<ITreballador[]>) => res.ok),
        map((res: HttpResponse<ITreballador[]>) => res.body)
      )
      .subscribe((res: ITreballador[]) => {
        this.treballadors = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTreballadors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITreballador) {
    return item.id;
  }

  registerChangeInTreballadors() {
    this.eventSubscriber = this.eventManager.subscribe('treballadorListModification', response => this.loadAll());
  }
}
