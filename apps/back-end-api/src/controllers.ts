import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { UserController } from './user-manager/user/user.controller';
import { ScenariosController } from './scenarios-manager/domain/scenario/scenarios.controller';
import { PricesController } from './booking-manager/domain/prices/prices.controller';
import { BookingController } from './booking-manager/domain/booking/booking.controller';
import { TimeSlotController } from './booking-manager/domain/time-slot/time-slot.controller';
export const controllers = [
  UserController,
  HealthcheckController,
  ScenariosController,
  PricesController,
  BookingController,
  TimeSlotController,
];
