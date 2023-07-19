import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { PasswordService } from '../../app/services/password/password.service';

@Injectable()
export class BcryptPasswordServiceAdapter implements PasswordService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePassword(
    password: string,
    comparePassword: string,
  ): Promise<boolean> {
    return compare(password, comparePassword);
  }
}
