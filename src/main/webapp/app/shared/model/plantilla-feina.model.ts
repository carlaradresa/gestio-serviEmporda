import { Moment } from 'moment';
import { IPeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { IPeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';

export interface IPlantillaFeina {
  id?: number;
  horaInici?: string;
  horaFinal?: string;
  tempsPrevist?: number;
  facturacioAutomatica?: boolean;
  observacions?: string;
  setmanaInicial?: Moment;
  setmanaFinal?: Moment;
  numeroControl?: number;
  periodicitatConfigurable?: IPeriodicitatConfigurable;
  periodicitatSetmanals?: IPeriodicitatSetmanal[];
}

export class PlantillaFeina implements IPlantillaFeina {
  constructor(
    public id?: number,
    public horaInici?: string,
    public horaFinal?: string,
    public tempsPrevist?: number,
    public facturacioAutomatica?: boolean,
    public observacions?: string,
    public setmanaInicial?: Moment,
    public setmanaFinal?: Moment,
    public numeroControl?: number,
    public periodicitatConfigurable?: IPeriodicitatConfigurable,
    public periodicitatSetmanals?: IPeriodicitatSetmanal[]
  ) {
    this.facturacioAutomatica = this.facturacioAutomatica || false;
  }
}
