import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mariaDb',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 8889,
  user: 'gestionnaire',
  password: '',
  database: 'gestionnaire',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MariaDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'mariaDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mariaDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
