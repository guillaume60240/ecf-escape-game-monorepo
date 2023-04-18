import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  min_players: number;
  @Column()
  max_players: number;
  @Column()
  price: number;
}
