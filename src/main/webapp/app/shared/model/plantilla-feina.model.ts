import { Moment } from 'moment';
import { IPeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { IPeriodicitatSetmanal } from 'app/shared/model/periodicitat-setmanal.model';
import { IClient } from 'app/shared/model/client.model';
import { ICategoria } from 'app/shared/model/categoria.model';
import { ITreballador } from 'app/shared/model/treballador.model';

export interface IPlantillaFeina {
  id?: number;
  nom?: string;
  descripcio?: string;
  horaInici?: string;
  horaFinal?: string;
  tempsPrevist?: string;
  facturacioAutomatica?: boolean;
  observacions?: string;
  setmanaInicial?: Moment;
  setmanaFinal?: Moment;
  numeroControl?: number;
  periodicitatConfigurable?: IPeriodicitatConfigurable;
  periodicitatSetmanals?: IPeriodicitatSetmanal[];
  client?: IClient;
  categoria?: ICategoria;
  treballadors?: ITreballador[];
}

export class PlantillaFeina implements IPlantillaFeina {
  constructor(
    public id?: number,
    public nom?: string,
    public descripcio?: string,
    public horaInici?: string,
    public horaFinal?: string,
    public tempsPrevist?: string,
    public facturacioAutomatica?: boolean,
    public observacions?: string,
    public setmanaInicial?: Moment,
    public setmanaFinal?: Moment,
    public numeroControl?: number,
    public periodicitatConfigurable?: IPeriodicitatConfigurable,
    public periodicitatSetmanals?: IPeriodicitatSetmanal[],
    public client?: IClient,
    public categoria?: ICategoria,
    public treballadors?: ITreballador[]
  ) {
    this.facturacioAutomatica = this.facturacioAutomatica || false;
  }
}
