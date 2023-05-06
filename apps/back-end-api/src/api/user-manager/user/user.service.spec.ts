import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { mock } from 'jest-mock-extended';

describe('HealthcheckService', () => {
  let service: UserService;

  const repository = mock<UserRepository>();

  beforeEach(() => {
    service = new UserService(repository);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
