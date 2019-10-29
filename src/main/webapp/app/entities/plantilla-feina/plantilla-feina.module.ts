import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestioClientsSharedModule } from 'app/shared/shared.module';
import { PlantillaFeinaComponent } from './plantilla-feina.component';
import { PlantillaFeinaDetailComponent } from './plantilla-feina-detail.component';
import { PlantillaFeinaUpdateComponent } from './plantilla-feina-update.component';
import { PlantillaFeinaDeletePopupComponent, PlantillaFeinaDeleteDialogComponent } from './plantilla-feina-delete-dialog.component';
import { plantillaFeinaRoute, plantillaFeinaPopupRoute } from './plantilla-feina.route';

const ENTITY_STATES = [...plantillaFeinaRoute, ...plantillaFeinaPopupRoute];

@NgModule({
  imports: [GestioClientsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlantillaFeinaComponent,
    PlantillaFeinaDetailComponent,
    PlantillaFeinaUpdateComponent,
    PlantillaFeinaDeleteDialogComponent,
    PlantillaFeinaDeletePopupComponent
  ],
  entryComponents: [PlantillaFeinaDeleteDialogComponent]
})
export class GestioClientsPlantillaFeinaModule {}
