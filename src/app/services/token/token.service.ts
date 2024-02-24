export interface ITokenPayload {
  id: string;
}

export interface ITokenService {
  /**
   * Creates a signed token from a given payload.
   * @param {ITokenPayload} payload the payload to be included in the token.
   * @returns {string} the generated signed token
   */
  sign(payload: ITokenPayload): string;

  /**
   * Verifies a token and returns its payload if valid.
   * @param {string} token the token to be verified
   * @returns {ITokenPayload} the payload of the token if valid
   */
  verify(token: string): ITokenPayload;
}
