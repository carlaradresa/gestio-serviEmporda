import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { PeriodicitatSetmanalComponent } from './periodicitat-setmanal.component';
import { PeriodicitatSetmanalDetailComponent } from './periodicitat-setmanal-detail.component';
import { PeriodicitatSetmanalUpdateComponent } from './periodicitat-setmanal-update.component';
import { PeriodicitatSetmanalDeleteDialogComponent } from './periodicitat-setmanal-delete-dialog.component';
import { periodicitatSetmanalRoute } from './periodicitat-setmanal.route';

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(periodicitatSetmanalRoute)],
  declarations: [
    PeriodicitatSetmanalComponent,
    PeriodicitatSetmanalDetailComponent,
    PeriodicitatSetmanalUpdateComponent,
    PeriodicitatSetmanalDeleteDialogComponent
  ],
  entryComponents: [PeriodicitatSetmanalDeleteDialogComponent]
})
export class GestioClientsPeriodicitatSetmanalModule {}
