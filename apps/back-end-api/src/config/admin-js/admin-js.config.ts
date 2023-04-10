/* import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { User } from 'src/entity/user.entity';

import { userAdapter } from './admin-adapters/user-adapter';

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const adminjsConfig = AdminModule.createAdminAsync({
  useFactory: () => ({
    adminJsOptions: {
      rootPath: '/admin',
      resources: [{ resource: User, options: userAdapter.options }],
    },
    auth: {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'secret',
    },
    sessionOptions: {
      resave: true,
      saveUninitialized: true,
      secret: 'secret',
    },
  }),
}); */
