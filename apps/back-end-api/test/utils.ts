import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

//méthode use by all test to check if the status code is correct
export async function testStatusCodeWithoutToken(
  path: string,
  app: INestApplication,
  statusCode: number,
) {
  const response = await request(app.getHttpServer()).get(path);
  expect(response.statusCode).toBe(statusCode);

  return response;
}
