import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { Dia } from 'app/shared/model/enumerations/dia.model';

export interface IPeriodicitatSetmanal {
  id?: number;
  diaSetmana?: Dia;
  plantillas?: IPlantillaFeina[];
}

export class PeriodicitatSetmanal implements IPeriodicitatSetmanal {
  constructor(public id?: number, public diaSetmana?: Dia, public plantillas?: IPlantillaFeina[]) {}
}
