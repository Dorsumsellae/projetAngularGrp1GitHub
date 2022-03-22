import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MariaDbDataSource} from '../datasources';
import {Stagiaire, StagiaireRelations} from '../models';

export class StagiaireRepository extends DefaultCrudRepository<
  Stagiaire,
  typeof Stagiaire.prototype.id_stagiaire,
  StagiaireRelations
> {
  constructor(
    @inject('datasources.mariaDb') dataSource: MariaDbDataSource,
  ) {
    super(Stagiaire, dataSource);
  }
}
