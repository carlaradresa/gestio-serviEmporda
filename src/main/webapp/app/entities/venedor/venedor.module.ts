import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { VenedorComponent } from './venedor.component';
import { VenedorDetailComponent } from './venedor-detail.component';
import { VenedorUpdateComponent } from './venedor-update.component';
import { VenedorDeletePopupComponent, VenedorDeleteDialogComponent } from './venedor-delete-dialog.component';
import { venedorRoute, venedorPopupRoute } from './venedor.route';

const ENTITY_STATES = [...venedorRoute, ...venedorPopupRoute];

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VenedorComponent,
    VenedorDetailComponent,
    VenedorUpdateComponent,
    VenedorDeleteDialogComponent,
    VenedorDeletePopupComponent
  ],
  entryComponents: [VenedorDeleteDialogComponent]
})
export class GestioClientsVenedorModule {}
