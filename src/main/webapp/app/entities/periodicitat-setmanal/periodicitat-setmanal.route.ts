import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';
import { PeriodicitatSetmanalService } from './periodicitat-setmanal.service';
import { PeriodicitatSetmanalComponent } from './periodicitat-setmanal.component';
import { PeriodicitatSetmanalDetailComponent } from './periodicitat-setmanal-detail.component';
import { PeriodicitatSetmanalUpdateComponent } from './periodicitat-setmanal-update.component';
import { IPeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';

@Injectable({ providedIn: 'root' })
export class PeriodicitatSetmanalResolve implements Resolve<IPeriodicitatSetmanal> {
  constructor(private service: PeriodicitatSetmanalService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPeriodicitatSetmanal> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((periodicitatSetmanal: HttpResponse<PeriodicitatSetmanal>) => periodicitatSetmanal.body));
    }
    return of(new PeriodicitatSetmanal());
  }
}

export const periodicitatSetmanalRoute: Routes = [
  {
    path: '',
    component: PeriodicitatSetmanalComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.periodicitatSetmanal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PeriodicitatSetmanalDetailComponent,
    resolve: {
      periodicitatSetmanal: PeriodicitatSetmanalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.periodicitatSetmanal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PeriodicitatSetmanalUpdateComponent,
    resolve: {
      periodicitatSetmanal: PeriodicitatSetmanalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.periodicitatSetmanal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PeriodicitatSetmanalUpdateComponent,
    resolve: {
      periodicitatSetmanal: PeriodicitatSetmanalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.periodicitatSetmanal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
