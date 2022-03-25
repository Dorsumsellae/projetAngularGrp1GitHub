import {Entity, model, property} from '@loopback/repository';

@model()
export class Invites_evennement extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id_stagiaire?: number;

  @property({
    type: 'number',
    id: true,
  })
  id_evenement: number;

  @property({
    type: 'number',
  })
  status?: number;

  constructor(data?: Partial<Invites_evennement>) {
    super(data);
  }
}

export interface InvitesEvennementRelations {
  // describe navigational properties here
}

export type InvitesEvennementWithRelations = Invites_evennement &
  InvitesEvennementRelations;
