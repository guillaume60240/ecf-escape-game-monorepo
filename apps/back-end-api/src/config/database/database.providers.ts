import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { Scenario } from 'src/entity/scenario.entity';
import { Price } from 'src/entity/price.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'test_postgres',
        entities: [User, Scenario, Price],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
