import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FaqService } from './faq.service';
import { FaqDto } from '../dto/responses/faq.dto';
@ApiTags('FAQ manager')
@Controller('faq')
export class FaqController {
  constructor(private service: FaqService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  @ApiResponse({
    status: 200,
    description: 'Liste des faq ',
    type: FaqDto,
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
    summary: 'Get all faq ',
    description: 'Generals questions and answers',
  })
  async getAllFaq(): Promise<FaqDto[]> {
    return await this.service.getAllFaq();
  }
}
