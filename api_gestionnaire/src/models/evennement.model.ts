import {Entity, model, property} from '@loopback/repository';

@model()
export class Evennement extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_evenement?: number;

  @property({
    type: 'string',
  })
  Nom?: string;

  @property({
    type: 'date',
  })
  Jour?: string;

  @property({
    type: 'number',
    required: true,
  })
  id_lieu: number;

  @property({
    type: 'number',
    required: true,
  })
  id_stagiaire: number;

  @property({
    type: 'number',
  })
  status?: number;

  constructor(data?: Partial<Evennement>) {
    super(data);
  }
}

export interface EvennementRelations {
  // describe navigational properties here
}

export type EvennementWithRelations = Evennement & EvennementRelations;
