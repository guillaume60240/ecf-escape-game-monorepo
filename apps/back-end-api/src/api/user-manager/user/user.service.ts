import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/responses/user.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async getAllUsers(): Promise<UserDto[]> {
    return await this.usersRepository.getAllUsers();
  }
  async getOneUserById(id: string): Promise<UserDto> {
    return await this.usersRepository.getOneUserById(id);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  async registerUser(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);
    const userFromDb = await this.usersRepository.findOneByEmail(user.email);
    if (userFromDb) {
      throw new Error('Internal server error');
    }
    const newUser = await this.usersRepository.saveNewUser(user);
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  }

  async getMe(user: Partial<UserDto>) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
