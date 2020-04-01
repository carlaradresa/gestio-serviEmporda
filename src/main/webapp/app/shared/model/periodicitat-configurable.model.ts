import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { Periodicitat } from 'app/shared/model/enumerations/periodicitat.model';

export interface IPeriodicitatConfigurable {
  id?: number;
  periodicitat?: Periodicitat;
  frequencia?: number;
  observacions?: string;
  plantilla?: IPlantillaFeina;
}

export class PeriodicitatConfigurable implements IPeriodicitatConfigurable {
  constructor(
    public id?: number,
    public periodicitat?: Periodicitat,
    public frequencia?: number,
    public observacions?: string,
    public plantilla?: IPlantillaFeina
  ) {}
}
