import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { ControlComponent } from './control.component';
import { ControlDetailComponent } from './control-detail.component';
import { ControlUpdateComponent } from './control-update.component';
import { ControlDeletePopupComponent, ControlDeleteDialogComponent } from './control-delete-dialog.component';
import { controlRoute, controlPopupRoute } from './control.route';

const ENTITY_STATES = [...controlRoute, ...controlPopupRoute];

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ControlComponent,
    ControlDetailComponent,
    ControlUpdateComponent,
    ControlDeleteDialogComponent,
    ControlDeletePopupComponent
  ],
  entryComponents: [ControlDeleteDialogComponent]
})
export class GestioClientsControlModule {}
