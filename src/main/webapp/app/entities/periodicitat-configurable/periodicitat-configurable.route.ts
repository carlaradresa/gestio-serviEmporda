import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { PeriodicitatConfigurableService } from './periodicitat-configurable.service';
import { PeriodicitatConfigurableComponent } from './periodicitat-configurable.component';
import { PeriodicitatConfigurableDetailComponent } from './periodicitat-configurable-detail.component';
import { PeriodicitatConfigurableUpdateComponent } from './periodicitat-configurable-update.component';
import { IPeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';

@Injectable({ providedIn: 'root' })
export class PeriodicitatConfigurableResolve implements Resolve<IPeriodicitatConfigurable> {
  constructor(private service: PeriodicitatConfigurableService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPeriodicitatConfigurable> {
    const id = route.params['id'];
    if (id) {
      return this.service
        .find(id)
        .pipe(map((periodicitatConfigurable: HttpResponse<PeriodicitatConfigurable>) => periodicitatConfigurable.body));
    }
    return of(new PeriodicitatConfigurable());
  }
}

export const periodicitatConfigurableRoute: Routes = [
  {
    path: '',
    component: PeriodicitatConfigurableComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.periodicitatConfigurable.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PeriodicitatConfigurableDetailComponent,
    resolve: {
      periodicitatConfigurable: PeriodicitatConfigurableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.periodicitatConfigurable.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PeriodicitatConfigurableUpdateComponent,
    resolve: {
      periodicitatConfigurable: PeriodicitatConfigurableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.periodicitatConfigurable.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PeriodicitatConfigurableUpdateComponent,
    resolve: {
      periodicitatConfigurable: PeriodicitatConfigurableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.periodicitatConfigurable.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
