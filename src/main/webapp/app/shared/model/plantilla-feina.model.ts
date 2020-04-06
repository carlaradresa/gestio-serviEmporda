import { Moment } from 'moment';
import { IPeriodicitatConfigurable } from 'app/shared/model/periodicitat-configurable.model';
import { ICategoria } from 'app/shared/model/categoria.model';
import { IClient } from 'app/shared/model/client.model';
import { ITreballador } from 'app/shared/model/treballador.model';
import { Dia } from 'app/shared/model/enumerations/dia.model';

export interface IPlantillaFeina {
  id?: number;
  nom?: string;
  setmanaInicial?: Moment;
  setmanaFinal?: Moment;
  horaInici?: Moment;
  horaFinal?: Moment;
  tempsPrevist?: Moment;
  intervalControl?: number;
  diaSetmana?: Dia;
  facturacioAutomatica?: boolean;
  observacions?: string;
  periodicitatConfigurable?: IPeriodicitatConfigurable;
  categoria?: ICategoria;
  client?: IClient;
  treballadors?: ITreballador[];
}

export class PlantillaFeina implements IPlantillaFeina {
  constructor(
    public id?: number,
    public nom?: string,
    public setmanaInicial?: Moment,
    public setmanaFinal?: Moment,
    public horaInici?: Moment,
    public horaFinal?: Moment,
    public tempsPrevist?: Moment,
    public intervalControl?: number,
    public diaSetmana?: Dia,
    public facturacioAutomatica?: boolean,
    public observacions?: string,
    public periodicitatConfigurable?: IPeriodicitatConfigurable,
    public categoria?: ICategoria,
    public client?: IClient,
    public treballadors?: ITreballador[]
  ) {
    this.facturacioAutomatica = this.facturacioAutomatica || false;
  }
}
