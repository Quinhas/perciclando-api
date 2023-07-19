export abstract class PasswordService {
  abstract hashPassword(password: string): Promise<string>;
  abstract comparePassword(
    password: string,
    comparePassword: string,
  ): Promise<boolean>;
}
