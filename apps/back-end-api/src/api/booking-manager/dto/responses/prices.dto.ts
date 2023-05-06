import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PricesDto {
  @ApiProperty()
  @IsNumber()
  minPlayers: number;
  @ApiProperty()
  @IsNumber()
  maxPlayers: number;
  @ApiProperty()
  @IsNumber()
  price: number;
}
