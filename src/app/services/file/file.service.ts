export interface IFileService {
  /**
   * Upload the file
   * @param {Express.Multer.File} file The file to be uploaded
   *
   * @return {string} URL of the file
   */
  uploadFile(file: Express.Multer.File): Promise<string>;
}
