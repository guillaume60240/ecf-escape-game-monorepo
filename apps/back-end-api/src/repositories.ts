import { PostgreHealthcheckRepository } from './healthcheck/healthcheck.repository';
import { UserRepository } from './user-manager/user/user.repository';

export const repositories = [UserRepository, PostgreHealthcheckRepository];
