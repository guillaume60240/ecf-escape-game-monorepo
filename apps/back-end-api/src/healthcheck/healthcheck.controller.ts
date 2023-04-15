import { HealthcheckDto } from './healthcheck.dto';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthcheckServiceCustom } from './healthcheck.service';

@ApiTags('Healthcheck')
@Controller('healthcheck')
export class HealthcheckController {
  constructor(private service: HealthcheckServiceCustom) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Healthcheck',
    type: HealthcheckDto,
  })
  @ApiOperation({
    summary: 'Healthcheck',
    description: 'Check if the Health Check is successful',
  })
  async healthcheck(): Promise<HealthcheckDto> {
    return {
      connexion: {
        details: 'Back-end API connexion',
        status: await this.service.healthService(),
      },
    };
  }
}
