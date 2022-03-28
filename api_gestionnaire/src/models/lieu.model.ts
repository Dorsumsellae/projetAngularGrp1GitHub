import {Entity, model, property} from '@loopback/repository';

@model()
export class Lieu extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_lieu?: number;

  @property({
    type: 'string',
  })
  nom?: string;

  @property({
    type: 'string',
  })
  adresse?: string;

  @property({
    type: 'number',
  })
  lat?: number;

  @property({
    type: 'number',
  })
  lon?: number;

  constructor(data?: Partial<Lieu>) {
    super(data);
  }
}

export interface LieuRelations {
  // describe navigational properties here
}

export type LieuWithRelations = Lieu & LieuRelations;
