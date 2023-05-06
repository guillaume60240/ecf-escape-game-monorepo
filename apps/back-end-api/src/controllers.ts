import { HealthcheckController } from './api/healthcheck/healthcheck.controller';
import { UserController } from './api/user-manager/user/user.controller';
import { ScenariosController } from './api/scenarios-manager/domain/scenario/scenarios.controller';
import { PricesController } from './api/booking-manager/domain/prices/prices.controller';
import { BookingController } from './api/booking-manager/domain/booking/booking.controller';
import { TimeSlotController } from './api/booking-manager/domain/time-slot/time-slot.controller';
import { GameController } from './game-manager/domain/game-manager.controller';
import { FaqController } from './api/faq-manager/domain/faq.controller';
export const controllers = [
  UserController,
  HealthcheckController,
  ScenariosController,
  PricesController,
  BookingController,
  TimeSlotController,
  GameController,
  FaqController,
];
