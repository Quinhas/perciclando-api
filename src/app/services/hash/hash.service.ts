export interface IHashService {
  /**
   * Hashes the provided data
   * @param {string} data the data to hash
   * @returns {Promise<string>} generated hash string
   */
  hash(data: string): Promise<string>;
  /**
   * Compare raw data to a hash
   * @param {string} data the data to hash and compare
   * @param {string} hash expected hash
   * @returns {Promise<boolean>} true if data matches, otherwise false
   */
  compare(data: string, hash: string): Promise<boolean>;
}
