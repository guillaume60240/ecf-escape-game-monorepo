import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PricesService } from './prices.service';
import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PricesDto } from 'src/scenarios-manager/dto/responses/prices.dto';

@ApiTags('Prices manager')
@Controller('prices')
export class PricesController {
  constructor(private service: PricesService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  @ApiResponse({
    status: 200,
    description: 'Liste des palier de prix ',
    type: PricesDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nothing found',
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur interne',
    type: InternalServerErrorException,
  })
  @ApiOperation({
    summary: 'Get all prices ',
    description: 'Get all prices range',
  })
  async getScearios(): Promise<PricesDto[]> {
    return await this.service.getAllScenarios();
  }
}
