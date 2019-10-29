import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { RepeticioTascaSetmanalComponent } from './repeticio-tasca-setmanal.component';
import { RepeticioTascaSetmanalDetailComponent } from './repeticio-tasca-setmanal-detail.component';
import { RepeticioTascaSetmanalUpdateComponent } from './repeticio-tasca-setmanal-update.component';
import {
  RepeticioTascaSetmanalDeletePopupComponent,
  RepeticioTascaSetmanalDeleteDialogComponent
} from './repeticio-tasca-setmanal-delete-dialog.component';
import { repeticioTascaSetmanalRoute, repeticioTascaSetmanalPopupRoute } from './repeticio-tasca-setmanal.route';

const ENTITY_STATES = [...repeticioTascaSetmanalRoute, ...repeticioTascaSetmanalPopupRoute];

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RepeticioTascaSetmanalComponent,
    RepeticioTascaSetmanalDetailComponent,
    RepeticioTascaSetmanalUpdateComponent,
    RepeticioTascaSetmanalDeleteDialogComponent,
    RepeticioTascaSetmanalDeletePopupComponent
  ],
  entryComponents: [RepeticioTascaSetmanalDeleteDialogComponent]
})
export class GestioClientsRepeticioTascaSetmanalModule {}
