import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  start_date: Date;
  @Column()
  user_id: number;
  @Column()
  scenario_id: number;
  @Column()
  players: number;
  @Column()
  price: number;
}
