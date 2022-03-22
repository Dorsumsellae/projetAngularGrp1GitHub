import {Entity, model, property} from '@loopback/repository';

@model()
export class Stagiaire extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_stagiaire?: number;

  @property({
    type: 'string',
  })
  nom?: string;

  @property({
    type: 'string',
  })
  prenom?: string;

  @property({
    type: 'string',
  })
  telephone?: string;

  @property({
    type: 'string',
  })
  adresse?: string;


  constructor(data?: Partial<Stagiaire>) {
    super(data);
  }
}

export interface StagiaireRelations {
  // describe navigational properties here
}

export type StagiaireWithRelations = Stagiaire & StagiaireRelations;
