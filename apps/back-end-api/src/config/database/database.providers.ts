import { User } from '@/entity/user.entity';
import { DataSource } from 'typeorm';
import { Scenario } from '@/entity/scenario.entity';
import { Price } from '@/entity/price.entity';
import { TimeSlot } from '@/entity/time-slot.entity';
import { Game } from '@/entity/game.entity';
import { Faq } from '@/entity/faq.entity';
import { GameMaster } from '@/entity/game-master.entity';

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
        entities: [User, Scenario, Price, TimeSlot, Game, Faq, GameMaster],
        synchronize: true,
        ssl: process.env.SSL_ENABLED == 'true' ? true : false,
      });
      return dataSource.initialize();
    },
  },
];
