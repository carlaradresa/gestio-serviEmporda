import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { UbicacioComponent } from './ubicacio.component';
import { UbicacioDetailComponent } from './ubicacio-detail.component';
import { UbicacioUpdateComponent } from './ubicacio-update.component';
import { UbicacioDeletePopupComponent, UbicacioDeleteDialogComponent } from './ubicacio-delete-dialog.component';
import { ubicacioRoute, ubicacioPopupRoute } from './ubicacio.route';

const ENTITY_STATES = [...ubicacioRoute, ...ubicacioPopupRoute];

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UbicacioComponent,
    UbicacioDetailComponent,
    UbicacioUpdateComponent,
    UbicacioDeleteDialogComponent,
    UbicacioDeletePopupComponent
  ],
  entryComponents: [UbicacioDeleteDialogComponent]
})
export class GestioClientsUbicacioModule {}
