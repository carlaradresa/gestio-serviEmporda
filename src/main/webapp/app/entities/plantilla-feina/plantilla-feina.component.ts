import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { AccountService } from 'app/core/auth/account.service';
import { PlantillaFeinaService } from './plantilla-feina.service';

@Component({
  selector: 'jhi-plantilla-feina',
  templateUrl: './plantilla-feina.component.html'
})
export class PlantillaFeinaComponent implements OnInit, OnDestroy {
  plantillaFeinas: IPlantillaFeina[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected plantillaFeinaService: PlantillaFeinaService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.plantillaFeinaService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlantillaFeina[]>) => res.ok),
        map((res: HttpResponse<IPlantillaFeina[]>) => res.body)
      )
      .subscribe((res: IPlantillaFeina[]) => {
        this.plantillaFeinas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlantillaFeinas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlantillaFeina) {
    return item.id;
  }

  registerChangeInPlantillaFeinas() {
    this.eventSubscriber = this.eventManager.subscribe('plantillaFeinaListModification', response => this.loadAll());
  }
}
