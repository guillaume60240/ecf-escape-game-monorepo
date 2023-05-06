import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Faq extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  question: string;
  @Column()
  answer: string;
}
