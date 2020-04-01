import { IUser } from 'app/core/user/user.model';
import { IFeina } from 'app/shared/model/feina.model';
import { IPlantillaFeina } from 'app/shared/model/plantilla-feina.model';
import { Estat } from 'app/shared/model/enumerations/estat.model';

export interface ITreballador {
  id?: number;
  nom?: string;
  carregaHores?: number;
  estat?: Estat;
  controlQualitat?: boolean;
  user?: IUser;
  feinas?: IFeina[];
  plantillafeinas?: IPlantillaFeina[];
}

export class Treballador implements ITreballador {
  constructor(
    public id?: number,
    public nom?: string,
    public carregaHores?: number,
    public estat?: Estat,
    public controlQualitat?: boolean,
    public user?: IUser,
    public feinas?: IFeina[],
    public plantillafeinas?: IPlantillaFeina[]
  ) {
    this.controlQualitat = this.controlQualitat || false;
  }
}
