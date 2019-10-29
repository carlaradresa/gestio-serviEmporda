import { Moment } from 'moment';
import { ITreballador } from 'app/shared/model/treballador.model';
import { IFeina } from 'app/shared/model/feina.model';

export interface IControl {
  id?: number;
  numero?: number;
  setmana?: Moment;
  causa?: string;
  dataRevisio?: Moment;
  comentaris?: string;
  revisor?: ITreballador;
  feina?: IFeina;
}

export class Control implements IControl {
  constructor(
    public id?: number,
    public numero?: number,
    public setmana?: Moment,
    public causa?: string,
    public dataRevisio?: Moment,
    public comentaris?: string,
    public revisor?: ITreballador,
    public feina?: IFeina
  ) {}
}
