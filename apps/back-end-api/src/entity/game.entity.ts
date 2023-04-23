import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  started_at: Date;
  @Column()
  ended_at: Date;
  @Column()
  scenario_id: string;
  @Column({ type: 'time' })
  duration: Date;
  @Column()
  booking_id: string;
}
