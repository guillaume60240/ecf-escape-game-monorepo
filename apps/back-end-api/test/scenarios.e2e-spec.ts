import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { testConfig } from './test.config';
import { AppModule } from '@/app.module';
import { testStatusCodeWithoutToken } from './utils';

describe('Scenarios controller (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;

  const badScenarioId = 'badScenarioId';
  const scenarioId = 1;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(testConfig)
      .compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Test status code', () => {
    const array = [
      {
        name: 'should retunr 200 when get /scenarios',
        path: '/scenarios',
        statusCode: 200,
      },
      {
        name: 'should retunr 200 with good scenarioId',
        path: `/scenarios/${scenarioId}`,
        statusCode: 200,
      },
      {
        name: 'should retunr 500 when get with bad scenarioId',
        path: `/scenarios/${badScenarioId}`,
        statusCode: 500,
      },
    ];
    array.forEach((test) => {
      it(test.name, async () => {
        await testStatusCodeWithoutToken(test.path, app, test.statusCode);
      });
    });
  });
});
