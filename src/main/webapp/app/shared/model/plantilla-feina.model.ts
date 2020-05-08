import { Moment } from 'moment';
import { IPeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { IPeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';
import {IClient} from "app/shared/model/client.model";

export interface IPlantillaFeina {
  id?: number;
  nomPlantilla?: string;
  descripcio?: string;
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
  client?: IClient;
}

export class PlantillaFeina implements IPlantillaFeina {
  constructor(
    public id?: number,
    public nomPlantilla?: string,
    public descripcio?: string,
    public horaInici?: string,
    public horaFinal?: string,
    public tempsPrevist?: number,
    public facturacioAutomatica?: boolean,
    public observacions?: string,
    public setmanaInicial?: Moment,
    public setmanaFinal?: Moment,
    public numeroControl?: number,
    public periodicitatConfigurable?: IPeriodicitatConfigurable,
    public periodicitatSetmanals?: IPeriodicitatSetmanal[],
    public client?: IClient
  ) {
    this.facturacioAutomatica = this.facturacioAutomatica || false;
  }

}
