import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { userAdapter } from './admin-adapters/user-adapter';
import { scenarioAdapter } from './admin-adapters/scenario-adapter';
import { priceAdapter } from './admin-adapters/price-adapter';
import { timeSlotAdapter } from './admin-adapters/time-slot-adapter';
import { gameAdapter } from './admin-adapters/game-adapter';
import { faqAdapter } from './admin-adapters/faq-adapter';
import { gameMasterAdapter } from './admin-adapters/game-master-manager';

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
      branding: {
        companyName: 'Escape Game',
      },
      locale: {
        language: 'fr',
        translations: {
          actions: {
            new: 'Créer',
            edit: 'Modifier',
            show: 'Voir',
            delete: 'Supprimer',
            bulkDelete: 'Supprimer',
            list: 'Liste',
          },
          buttons: {
            filter: 'Filtrer',
            save: 'Sauvegarder',
            applyChanges: 'Appliquer',
            resetFilter: 'Réinitialiser',
            confirmRemovalMany:
              'Êtes-vous sûr de vouloir supprimer {{count}} enregistrements ?',
            confirmRemovalMany_plural:
              'Êtes-vous sûr de vouloir supprimer {{count}} enregistrements ?',
            logout: 'Déconnexion',
            login: 'Connexion',
            seeTheDocumentation: 'Voir la documentation',
            createFirstRecord: 'Créer le premier enregistrement',
          },
          labels: {
            navigation: 'Navigation',
            pages: 'Pages',
            selectedRecords: 'Sélection',
            filters: 'Filtres',
          },
          properties: {
            createdAt: 'Créé le',
            name: 'Nom',
            description: 'Description',
            duration: 'Durée',
            min_players: 'Nombre de joueurs minimum',
            max_players: 'Nombre de joueurs maximum',
            difficulty: 'Difficulté',
            summary: 'Résumé',
            price: 'Prix',
            display_hour: 'Heure',
            scenario_id: 'Scénario',
            started_at: 'Début',
            ended_at: 'Fin',
            email: 'Email',
            question: 'Question',
            answer: 'Réponse',
          },
        },
      },

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
        {
          resource: gameMasterAdapter.resource,
          options: gameMasterAdapter.options,
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
