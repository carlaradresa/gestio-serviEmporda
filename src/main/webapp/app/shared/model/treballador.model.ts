import { IUser } from 'app/core/user/user.model';
import { IFeina } from 'app/shared/model/feina.model';
import { Estat } from 'app/shared/model/enumerations/estat.model';

export interface ITreballador {
  id?: number;
  nom?: string;
  carregaHores?: string;
  estat?: Estat;
  controlQualitat?: boolean;
  user?: IUser;
  feinas?: IFeina[];
}

export class Treballador implements ITreballador {
  constructor(
    public id?: number,
    public nom?: string,
    public carregaHores?: string,
    public estat?: Estat,
    public controlQualitat?: boolean,
    public user?: IUser,
    public feinas?: IFeina[]
  ) {
    this.controlQualitat = this.controlQualitat || false;
  }
}
