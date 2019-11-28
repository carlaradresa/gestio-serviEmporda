import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { PeriodicitatConfigurableComponent } from './periodicitat-configurable.component';
import { PeriodicitatConfigurableDetailComponent } from './periodicitat-configurable-detail.component';
import { PeriodicitatConfigurableUpdateComponent } from './periodicitat-configurable-update.component';
import { PeriodicitatConfigurableDeleteDialogComponent } from './periodicitat-configurable-delete-dialog.component';
import { periodicitatConfigurableRoute } from './periodicitat-configurable.route';

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(periodicitatConfigurableRoute)],
  declarations: [
    PeriodicitatConfigurableComponent,
    PeriodicitatConfigurableDetailComponent,
    PeriodicitatConfigurableUpdateComponent,
    PeriodicitatConfigurableDeleteDialogComponent
  ],
  entryComponents: [PeriodicitatConfigurableDeleteDialogComponent]
})
export class GestioClientsPeriodicitatConfigurableModule {}
