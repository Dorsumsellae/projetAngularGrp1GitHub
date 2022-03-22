import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MariaDbDataSource} from '../datasources';
import {Evennement, EvennementRelations} from '../models';

export class EvennementRepository extends DefaultCrudRepository<
  Evennement,
  typeof Evennement.prototype.id_evenement,
  EvennementRelations
> {
  constructor(
    @inject('datasources.mariaDb') dataSource: MariaDbDataSource,
  ) {
    super(Evennement, dataSource);
  }
}
