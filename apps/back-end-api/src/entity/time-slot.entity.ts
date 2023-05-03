import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TimeSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  display_hour: string;
}
