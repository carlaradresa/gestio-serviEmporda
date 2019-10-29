import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IMarcatge } from 'app/shared/model/marcatge.model';
import { AccountService } from 'app/core/auth/account.service';
import { MarcatgeService } from './marcatge.service';

@Component({
  selector: 'jhi-marcatge',
  templateUrl: './marcatge.component.html'
})
export class MarcatgeComponent implements OnInit, OnDestroy {
  marcatges: IMarcatge[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected marcatgeService: MarcatgeService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.marcatgeService
      .query()
      .pipe(
        filter((res: HttpResponse<IMarcatge[]>) => res.ok),
        map((res: HttpResponse<IMarcatge[]>) => res.body)
      )
      .subscribe((res: IMarcatge[]) => {
        this.marcatges = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMarcatges();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMarcatge) {
    return item.id;
  }

  registerChangeInMarcatges() {
    this.eventSubscriber = this.eventManager.subscribe('marcatgeListModification', response => this.loadAll());
  }
}
