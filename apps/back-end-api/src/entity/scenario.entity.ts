import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Scenario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  summary: string;
  @Column()
  difficulty: number;
  @Column()
  min_players: number;
  @Column()
  max_players: number;
  @Column({ nullable: true })
  duration?: number;
  @Column()
  pictures: string;
}
