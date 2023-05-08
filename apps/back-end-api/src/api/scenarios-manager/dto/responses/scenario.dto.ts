import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ScenarioDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  minPlayers: number;

  @ApiProperty()
  @IsNumber()
  maxPlayers: number;

  @ApiProperty()
  @IsString()
  imgUrl: string;

  @ApiProperty()
  @IsNumber()
  difficulty: number;
}
