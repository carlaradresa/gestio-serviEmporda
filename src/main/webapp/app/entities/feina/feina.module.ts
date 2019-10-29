import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { FeinaComponent } from './feina.component';
import { FeinaDetailComponent } from './feina-detail.component';
import { FeinaUpdateComponent } from './feina-update.component';
import { FeinaDeletePopupComponent, FeinaDeleteDialogComponent } from './feina-delete-dialog.component';
import { feinaRoute, feinaPopupRoute } from './feina.route';

const ENTITY_STATES = [...feinaRoute, ...feinaPopupRoute];

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [FeinaComponent, FeinaDetailComponent, FeinaUpdateComponent, FeinaDeleteDialogComponent, FeinaDeletePopupComponent],
  entryComponents: [FeinaDeleteDialogComponent]
})
export class GestioClientsFeinaModule {}
