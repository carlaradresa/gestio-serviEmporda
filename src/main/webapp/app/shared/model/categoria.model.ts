import { IFeina } from 'app/shared/model/feina.model';

export interface ICategoria {
  id?: number;
  nomCategoria?: string;
  feinas?: IFeina[];
}

export class Categoria implements ICategoria {
  constructor(public id?: number, public nomCategoria?: string, public feinas?: IFeina[]) {}
}
