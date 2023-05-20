import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  started_at: Date;
  @Column({ nullable: true })
  ended_at: Date;
  @Column()
  scenario_id: number;
  @Column({ nullable: true })
  duration: number;
  @Column()
  booking_id: number;
}
