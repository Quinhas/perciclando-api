export interface TokenPayload {
  id: string;
}

export abstract class TokenService {
  abstract sign(user: TokenPayload): string;
  abstract verify(token: string): TokenPayload;
}
