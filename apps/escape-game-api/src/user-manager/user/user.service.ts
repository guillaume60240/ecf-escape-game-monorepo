import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/responses/user.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async getAllUsers(): Promise<UserDto[]> {
    return await this.usersRepository.getAllUsers();
  }
  async getOneUserById(id: number): Promise<UserDto> {
    return await this.usersRepository.getOneUserById(id);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  async registerUser(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);
    return this.usersRepository.saveNewUser(user);
  }
}

/*  getOne(id: number) {
  return this.usersRepository.findOne({ where: { id } });
}


async create(user: CreateUserDto) {
  user.password = await bcrypt.hash(user.password, 10);
  return this.usersRepository.save(user);
}

update(id: number, body: any) {
  return this.usersRepository.update(id, body);
}

delete(id: number) {
  return this.usersRepository.delete(id);
} */
