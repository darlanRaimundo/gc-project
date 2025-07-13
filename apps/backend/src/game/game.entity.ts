import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('games')
export class Game {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column()
  nome!: string;

  @ApiProperty()
  @Column({ nullable: true })
  appid?: number;

  @ApiProperty()
  @Column({ nullable: true })
  provider!: string;

  @ApiProperty({ type: [String] })
  @Column('json')
  categoria!: string[];

  @ApiProperty()
  @Column({ nullable: true })
  header_image?: string;
}
