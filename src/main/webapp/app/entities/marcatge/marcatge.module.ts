import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { MarcatgeComponent } from './marcatge.component';
import { MarcatgeDetailComponent } from './marcatge-detail.component';
import { MarcatgeUpdateComponent } from './marcatge-update.component';
import { MarcatgeDeletePopupComponent, MarcatgeDeleteDialogComponent } from './marcatge-delete-dialog.component';
import { marcatgeRoute, marcatgePopupRoute } from './marcatge.route';

const ENTITY_STATES = [...marcatgeRoute, ...marcatgePopupRoute];

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MarcatgeComponent,
    MarcatgeDetailComponent,
    MarcatgeUpdateComponent,
    MarcatgeDeleteDialogComponent,
    MarcatgeDeletePopupComponent
  ],
  entryComponents: [MarcatgeDeleteDialogComponent]
})
export class GestioClientsMarcatgeModule {}
