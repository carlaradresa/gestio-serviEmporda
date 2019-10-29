import { IFeina } from 'app/shared/model/feina.model';
import { Dia } from 'app/shared/model/enumerations/dia.model';

export interface IRepeticioTascaSetmanal {
  id?: number;
  dia?: Dia;
  activo?: boolean;
  feina?: IFeina;
}

export class RepeticioTascaSetmanal implements IRepeticioTascaSetmanal {
  constructor(public id?: number, public dia?: Dia, public activo?: boolean, public feina?: IFeina) {
    this.activo = this.activo || false;
  }
}
