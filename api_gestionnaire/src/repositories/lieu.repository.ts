import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MariaDbDataSource} from '../datasources';
import {Lieu, LieuRelations} from '../models';

export class LieuRepository extends DefaultCrudRepository<
  Lieu,
  typeof Lieu.prototype.id_lieu,
  LieuRelations
> {
  constructor(
    @inject('datasources.mariaDb') dataSource: MariaDbDataSource,
  ) {
    super(Lieu, dataSource);
  }
}
