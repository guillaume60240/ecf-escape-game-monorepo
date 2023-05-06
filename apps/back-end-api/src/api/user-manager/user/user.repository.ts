import { SlonikService } from '../../../config/slonik/slonik.service';
import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';
import { User } from '../../..//entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly slonik: SlonikService) {}

  async getAllUsers(): Promise<User[]> {
    const { rows } = await this.slonik.query(sql`
        SELECT * FROM public.user
        `);

    return rows as User[];
  }

  async getOneUserById(id: string): Promise<User> {
    const { rows } = await this.slonik.query(sql`
        SELECT * FROM public.user
        WHERE id = ${id}
        `);
    return rows[0] as any as User;
  }

  async findOneByEmail(email: string) {
    const { rows } = await this.slonik.query(sql`
        SELECT * FROM public.user
        WHERE email = ${email}
        `);
    return rows[0] as any as User;
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
