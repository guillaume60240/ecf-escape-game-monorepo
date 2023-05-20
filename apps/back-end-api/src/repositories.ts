import { PostgreHealthcheckRepository } from './api/healthcheck/healthcheck.repository';
import { UserRepository } from './api/user-manager/user/user.repository';
import { ScenarioRepository } from './api/scenarios-manager/domain/scenario/scenarios.repository';
import { PricesRepository } from './api/booking-manager/domain/prices/prices.repository';
import { BookingRepository } from './api/booking-manager/domain/booking/booking.repository';
import { TimeSlotRepository } from './api/booking-manager/domain/time-slot/time-slot.repository';
import { GameManagerRepository } from './api/game-manager/domain/game-manager.repository';
import { FaqRepository } from './api/faq-manager/domain/faq.repository';
import { GameMasterRepository } from './api/game-master-manager/domain/game-master/game-master.repository';

export const repositories = [
  UserRepository,
  PostgreHealthcheckRepository,
  ScenarioRepository,
  PricesRepository,
  BookingRepository,
  TimeSlotRepository,
  GameManagerRepository,
  FaqRepository,
  GameMasterRepository,
];
