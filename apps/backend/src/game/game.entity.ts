import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  categoria!: string;
}
