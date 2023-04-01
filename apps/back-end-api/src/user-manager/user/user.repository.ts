import { SlonikService } from '../../config/slonik/slonik.service';
import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';
import { UserDto } from './dto/responses/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getAllUsers(): Promise<UserDto[]> {
    const { rows } = await this.slonik.query(sql`
        SELECT * FROM public.user
        `);

    console.log('rows ', rows);
    return rows as UserDto[];
  }

  async getOneUserById(id: number): Promise<UserDto> {
    const { rows } = await this.slonik.query(sql`
        SELECT * FROM public.user
        WHERE id = ${id}
        `);
    return rows[0] as any as UserDto;
  }

  async findOneByEmail(email: string) {
    const { rows } = await this.slonik.query(sql`
        SELECT * FROM public.user
        WHERE email = ${email}
        `);
    return rows[0] as any as UserDto;
  }

  async saveNewUser(user: any) {
    const { rows } = await this.slonik.query(sql`
        INSERT INTO public.user (email, password, name)
        VALUES (${user.email}, ${user.password}, ${user.name})
        RETURNING *;
        `);
    return rows[0];
  }
}
