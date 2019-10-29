import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IControl } from 'app/shared/model/control.model';
import { AccountService } from 'app/core/auth/account.service';
import { ControlService } from './control.service';

@Component({
  selector: 'jhi-control',
  templateUrl: './control.component.html'
})
export class ControlComponent implements OnInit, OnDestroy {
  controls: IControl[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected controlService: ControlService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.controlService
      .query()
      .pipe(
        filter((res: HttpResponse<IControl[]>) => res.ok),
        map((res: HttpResponse<IControl[]>) => res.body)
      )
      .subscribe((res: IControl[]) => {
        this.controls = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInControls();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IControl) {
    return item.id;
  }

  registerChangeInControls() {
    this.eventSubscriber = this.eventManager.subscribe('controlListModification', response => this.loadAll());
  }
}
