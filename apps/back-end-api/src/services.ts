import { HealthcheckServiceCustom } from './api/healthcheck/healthcheck.service';
import { UserService } from './api/user-manager/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ScenarioService } from './api/scenarios-manager/domain/scenario/scenarios.service';
import { PricesService } from './api/booking-manager/domain/prices/prices.service';
import { BookingService } from './api/booking-manager/domain/booking/booking.service';
import { TimeSlotService } from './api/booking-manager/domain/time-slot/time-slot.service';
import { GameService } from './game-manager/domain/game-manager.service';
import { FaqService } from './api/faq-manager/domain/faq.service';
import { GameMasterService } from './api/game-master-manager/domain/game-master/game-master.service';

export const services = [
  // Add your services here
  UserService,
  HealthcheckServiceCustom,
  JwtService,
  ScenarioService,
  PricesService,
  BookingService,
  TimeSlotService,
  GameService,
  FaqService,
  GameMasterService,
];
