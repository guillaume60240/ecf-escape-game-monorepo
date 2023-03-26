import { Adapter, Resource, Database } from '@adminjs/sql';
import express from 'express';
import Plugin from '@adminjs/express';
import AdminJS from 'adminjs';

AdminJS.registerAdapter({
  Database,
  Resource,
});

const start = async () => {
  const app = express();

  const db = await new Adapter('postgresql', {
    connectionString: '<your database url>',
    database: '<your database name>',
  }).init();

  const admin = new AdminJS({
    resources: [
      {
        resource: db.table('users'),
        options: {},
      },
    ],
  });

  admin.watch();

  const router = Plugin.buildRouter(admin);

  app.use(admin.options.rootPath, router);

  app.listen(8080, () => {
    console.log('app started');
  });
};

start();
