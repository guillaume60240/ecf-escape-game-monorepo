export class BookingEntity {
  id: number;
  start_date: Date;
  time_slot: string;
  user_id: number;
  scenario_id: number;
  players: number;
  price: number;
}
