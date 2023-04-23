import { PostgreHealthcheckRepository } from './healthcheck/healthcheck.repository';
import { UserRepository } from './user-manager/user/user.repository';
import { ScenarioRepository } from './scenarios-manager/domain/scenario/scenarios.repository';
import { PricesRepository } from './booking-manager/domain/prices/prices.repository';
import { BookingRepository } from './booking-manager/domain/booking/booking.repository';
import { TimeSlotRepository } from './booking-manager/domain/time-slot/time-slot.repository';
import { GameManagerRepository } from './game-manager/domain/game-manager.repository';

export const repositories = [
  UserRepository,
  PostgreHealthcheckRepository,
  ScenarioRepository,
  PricesRepository,
  BookingRepository,
  TimeSlotRepository,
  GameManagerRepository,
];
