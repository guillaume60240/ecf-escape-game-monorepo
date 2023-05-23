import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class NewGameDtoResponse {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  time_slot: string;
  @ApiProperty()
  @IsNumber()
  scenario_id: number;
  @ApiProperty()
  @IsNumber()
  user_id: number;
  @ApiProperty()
  @IsNumber()
  players: number;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNumber()
  start_date: Date;
  @ApiProperty({
    example: 'started',
  })
  @IsString()
  status: string;
}

export class GameDtoResponse {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsNumber()
  started_at: number;
  @ApiProperty()
  @IsNumber()
  ended_at: number;
  @ApiProperty()
  @IsNumber()
  duration: number;
  @ApiProperty()
  @IsNumber()
  booking_id: number;
  @ApiProperty()
  @IsNumber()
  scenario_id: number;
}

export class ClosedGameDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  time_slot: string;
  @ApiProperty()
  @IsNumber()
  user_id: number;
  @ApiProperty()
  @IsNumber()
  scenario_id: number;
  @ApiProperty()
  @IsNumber()
  players: number;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNumber()
  start_date: Date;
  @ApiProperty({
    example: 'finished',
  })
  @IsString()
  status: string;
}
