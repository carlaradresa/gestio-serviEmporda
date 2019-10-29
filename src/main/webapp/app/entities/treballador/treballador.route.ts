import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Treballador } from 'app/shared/model/treballador.model';
import { TreballadorService } from './treballador.service';
import { TreballadorComponent } from './treballador.component';
import { TreballadorDetailComponent } from './treballador-detail.component';
import { TreballadorUpdateComponent } from './treballador-update.component';
import { TreballadorDeletePopupComponent } from './treballador-delete-dialog.component';
import { ITreballador } from 'app/shared/model/treballador.model';

@Injectable({ providedIn: 'root' })
export class TreballadorResolve implements Resolve<ITreballador> {
  constructor(private service: TreballadorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITreballador> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Treballador>) => response.ok),
        map((treballador: HttpResponse<Treballador>) => treballador.body)
      );
    }
    return of(new Treballador());
  }
}

export const treballadorRoute: Routes = [
  {
    path: '',
    component: TreballadorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.treballador.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TreballadorDetailComponent,
    resolve: {
      treballador: TreballadorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.treballador.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TreballadorUpdateComponent,
    resolve: {
      treballador: TreballadorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.treballador.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TreballadorUpdateComponent,
    resolve: {
      treballador: TreballadorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.treballador.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const treballadorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TreballadorDeletePopupComponent,
    resolve: {
      treballador: TreballadorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.treballador.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
