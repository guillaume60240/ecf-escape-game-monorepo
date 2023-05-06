import { UserController } from './user.controller';
import { UserService } from './user.service';
import { mock } from 'jest-mock-extended';

describe('HealthcheckService', () => {
  let controller: UserController;

  const service = mock<UserService>();

  beforeEach(() => {
    controller = new UserController(service);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
