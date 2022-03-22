import {Entity, model, property} from '@loopback/repository';

@model()
export class InvitesEvennement extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_stagiaire?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_evenement: number;


  constructor(data?: Partial<InvitesEvennement>) {
    super(data);
  }
}

export interface InvitesEvennementRelations {
  // describe navigational properties here
}

export type InvitesEvennementWithRelations = InvitesEvennement & InvitesEvennementRelations;
