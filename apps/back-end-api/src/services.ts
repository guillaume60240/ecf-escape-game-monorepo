import { HealthcheckServiceCustom } from './healthcheck/healthcheck.service';
import { UserService } from './user-manager/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ScenarioService } from './scenarios-manager/domain/scenario/scenarios.service';
import { PricesService } from './scenarios-manager/domain/prices/prices.service';

export const services = [
  // Add your services here
  UserService,
  HealthcheckServiceCustom,
  JwtService,
  ScenarioService,
  PricesService,
];
