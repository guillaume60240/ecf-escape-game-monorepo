import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { UserController } from './user-manager/user/user.controller';
import { ScenariosController } from './scenarios-manager/domain/scenario/scenarios.controller';
import { PricesController } from './scenarios-manager/domain/prices/prices.controller';
export const controllers = [
  UserController,
  HealthcheckController,
  ScenariosController,
  PricesController,
];
