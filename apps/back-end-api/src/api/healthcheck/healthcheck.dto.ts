import { ApiProperty } from '@nestjs/swagger';

export class HealthcheckDto {
  @ApiProperty({
    type: 'object',
    properties: {
      details: {
        type: 'string',
        example: 'Back-end API connexion',
      },
      status: {
        type: 'string',
        example: 'ok',
      },
    },
  })
  connexion!: {
    details: string;
    status: string;
  };
}
