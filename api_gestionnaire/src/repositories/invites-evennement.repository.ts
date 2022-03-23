import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MariaDbDataSource} from '../datasources';
import {Invites_evennement, InvitesEvennementRelations} from '../models';

export class InvitesEvennementRepository extends DefaultCrudRepository<
  Invites_evennement,
  typeof Invites_evennement.prototype.id_stagiaire,
  InvitesEvennementRelations
> {
  constructor(@inject('datasources.mariaDb') dataSource: MariaDbDataSource) {
    super(Invites_evennement, dataSource);
  }
}
