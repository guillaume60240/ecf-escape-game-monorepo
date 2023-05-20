import { Injectable } from '@nestjs/common';
import { GameManagerRepository } from './game-manager.repository';
import { BookingService } from '../../booking-manager/domain/booking/booking.service';

@Injectable()
export class GameService {
  constructor(
    private repository: GameManagerRepository,
    private bookingService: BookingService,
  ) {}

  async getGameRecordDurationByScenarioId(scenarioId: string): Promise<any> {
    const request = await this.repository.getGameRecordDurationByScenarioId(
      scenarioId,
    );
    return {
      duration: request.duration,
    };
  }

  async newGame(bookingId: number, scenarioId: number): Promise<any> {
    const request = await this.repository.newGame(bookingId, scenarioId);
    if (request.id) {
      const updateBookedDate = await this.bookingService.updateBookedDateStatus(
        bookingId,
        'started',
      );
      if (!updateBookedDate) {
        throw new Error("La réservation n'a pas pu être mise à jour");
      }
    }
    return {
      id: request.id,
    };
  }

  async closeGame(gameId: number): Promise<any> {
    const gameToUpdate = await this.repository.getGameById(gameId);
    if (!gameToUpdate.ended_at) {
      const startedAt = new Date(gameToUpdate.started_at);
      const endedAt = new Date();
      const duration = endedAt.getTime() - startedAt.getTime();
      const durationInSecond = Math.round(duration / 1000);
      const request = await this.repository.closeGame(gameId, durationInSecond);
      if (request.booking_id) {
        const updateBookedDate =
          await this.bookingService.updateBookedDateStatus(
            request.booking_id,
            'finished',
          );
        if (!updateBookedDate) {
          throw new Error("La réservation n'a pas pu être mise à jour");
        }
      }
      return {
        id: request.id,
      };
    } else {
      throw new Error('La partie est déjà terminée');
    }
  }
}
