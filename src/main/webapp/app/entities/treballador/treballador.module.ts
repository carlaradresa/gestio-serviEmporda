import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { TreballadorComponent } from './treballador.component';
import { TreballadorDetailComponent } from './treballador-detail.component';
import { TreballadorUpdateComponent } from './treballador-update.component';
import { TreballadorDeletePopupComponent, TreballadorDeleteDialogComponent } from './treballador-delete-dialog.component';
import { treballadorRoute, treballadorPopupRoute } from './treballador.route';

const ENTITY_STATES = [...treballadorRoute, ...treballadorPopupRoute];

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TreballadorComponent,
    TreballadorDetailComponent,
    TreballadorUpdateComponent,
    TreballadorDeleteDialogComponent,
    TreballadorDeletePopupComponent
  ],
  entryComponents: [TreballadorDeleteDialogComponent]
})
export class GestioClientsTreballadorModule {}
