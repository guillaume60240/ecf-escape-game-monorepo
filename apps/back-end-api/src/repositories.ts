import { PostgreHealthcheckRepository } from './healthcheck/healthcheck.repository';
import { UserRepository } from './user-manager/user/user.repository';
import { ScenarioRepository } from './scenarios-manager/domain/scenario/scenarios.repository';
import { PricesRepository } from './scenarios-manager/domain/prices/prices.repository';

export const repositories = [
  UserRepository,
  PostgreHealthcheckRepository,
  ScenarioRepository,
  PricesRepository,
];
