import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ubicacio } from 'app/shared/model/ubicacio.model';
import { UbicacioService } from './ubicacio.service';
import { UbicacioComponent } from './ubicacio.component';
import { UbicacioDetailComponent } from './ubicacio-detail.component';
import { UbicacioUpdateComponent } from './ubicacio-update.component';
import { UbicacioDeletePopupComponent } from './ubicacio-delete-dialog.component';
import { IUbicacio } from 'app/shared/model/ubicacio.model';

@Injectable({ providedIn: 'root' })
export class UbicacioResolve implements Resolve<IUbicacio> {
  constructor(private service: UbicacioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUbicacio> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ubicacio>) => response.ok),
        map((ubicacio: HttpResponse<Ubicacio>) => ubicacio.body)
      );
    }
    return of(new Ubicacio());
  }
}

export const ubicacioRoute: Routes = [
  {
    path: '',
    component: UbicacioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.ubicacio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UbicacioDetailComponent,
    resolve: {
      ubicacio: UbicacioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.ubicacio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UbicacioUpdateComponent,
    resolve: {
      ubicacio: UbicacioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.ubicacio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UbicacioUpdateComponent,
    resolve: {
      ubicacio: UbicacioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.ubicacio.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ubicacioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UbicacioDeletePopupComponent,
    resolve: {
      ubicacio: UbicacioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestioClientsApp.ubicacio.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
