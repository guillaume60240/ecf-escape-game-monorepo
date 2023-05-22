const pgConfig: any = {
  client: 'pg',
  connection: {
    user: 'postgres',
    password: 'postgres',
    host: 'postgres',
    port: '5432',
    database: 'escape_game_postgres',
  },
};

export const testConfig = {
  get(key: string): any {
    if (key === 'postgres') {
      return pgConfig;
    }
  },
};
