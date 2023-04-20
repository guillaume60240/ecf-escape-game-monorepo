import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TimeSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  display_hour: string;
}
