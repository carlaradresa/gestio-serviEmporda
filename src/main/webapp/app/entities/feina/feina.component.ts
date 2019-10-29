import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IFeina } from 'app/shared/model/feina.model';
import { AccountService } from 'app/core/auth/account.service';
import { FeinaService } from './feina.service';

@Component({
  selector: 'jhi-feina',
  templateUrl: './feina.component.html'
})
export class FeinaComponent implements OnInit, OnDestroy {
  feinas: IFeina[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected feinaService: FeinaService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.feinaService
      .query()
      .pipe(
        filter((res: HttpResponse<IFeina[]>) => res.ok),
        map((res: HttpResponse<IFeina[]>) => res.body)
      )
      .subscribe((res: IFeina[]) => {
        this.feinas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFeinas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFeina) {
    return item.id;
  }

  registerChangeInFeinas() {
    this.eventSubscriber = this.eventManager.subscribe('feinaListModification', response => this.loadAll());
  }
}
