import { IUser } from 'app/core/user/user.model';
import { IMarcatge } from 'app/shared/model/marcatge.model';
import { IControl } from 'app/shared/model/control.model';
import { IFeina } from 'app/shared/model/feina.model';

export interface ITreballador {
  id?: number;
  numero?: number;
  nom?: string;
  carregaHores?: number;
  actiu?: boolean;
  controlQualitat?: boolean;
  user?: IUser;
  marcatges?: IMarcatge[];
  revisionsFetes?: IControl[];
  feinas?: IFeina[];
}

export class Treballador implements ITreballador {
  constructor(
    public id?: number,
    public numero?: number,
    public nom?: string,
    public carregaHores?: number,
    public actiu?: boolean,
    public controlQualitat?: boolean,
    public user?: IUser,
    public marcatges?: IMarcatge[],
    public revisionsFetes?: IControl[],
    public feinas?: IFeina[]
  ) {
    this.actiu = this.actiu || false;
    this.controlQualitat = this.controlQualitat || false;
  }
}
