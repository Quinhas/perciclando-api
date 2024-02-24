import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { IHashService } from '../../../app/services/hash/hash.service';

@Injectable()
export class BcryptHashServiceAdapter implements IHashService {
  async hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  async compare(password: string, comparePassword: string): Promise<boolean> {
    return compare(password, comparePassword);
  }
}
