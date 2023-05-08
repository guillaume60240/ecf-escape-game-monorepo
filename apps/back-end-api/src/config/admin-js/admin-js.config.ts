import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { userAdapter } from './admin-adapters/user-adapter';
import { scenarioAdapter } from './admin-adapters/scenario-adapter';
import { priceAdapter } from './admin-adapters/price-adapter';
import { timeSlotAdapter } from './admin-adapters/time-slot-adapter';
import { gameAdapter } from './admin-adapters/game-adapter';
import { faqAdapter } from './admin-adapters/faq-adapter';

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_JS_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_JS_PASSWORD || 'password',
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
      resources: [
        { resource: userAdapter.resource, options: userAdapter.options },
        {
          resource: scenarioAdapter.resource,
          options: scenarioAdapter.options,
        },
        {
          resource: priceAdapter.resource,
          options: priceAdapter.options,
        },
        {
          resource: timeSlotAdapter.resource,
          options: timeSlotAdapter.options,
        },
        {
          resource: gameAdapter.resource,
          options: gameAdapter.options,
        },
        {
          resource: faqAdapter.resource,
          options: faqAdapter.options,
        },
      ],
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
});
