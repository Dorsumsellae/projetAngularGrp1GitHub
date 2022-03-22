import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MariaDbDataSource} from '../datasources';
import {InvitesEvennement, InvitesEvennementRelations} from '../models';

export class InvitesEvennementRepository extends DefaultCrudRepository<
  InvitesEvennement,
  typeof InvitesEvennement.prototype.id_stagiaire,
  InvitesEvennementRelations
> {
  constructor(
    @inject('datasources.mariaDb') dataSource: MariaDbDataSource,
  ) {
    super(InvitesEvennement, dataSource);
  }
}
