import {registerAs} from '@nestjs/config';
import {MulterOptions} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {editFileName} from 'common/helpers';
import {diskStorage} from 'multer';

export default registerAs('multer', () => ({
  uploadDirectory: process.env.UPLOAD_DIRECORY
}));

export function getFileInterceptorOptions(): MulterOptions {
  return {
    storage: diskStorage({
      destination: './files', // как внедрить переменную?
      filename: editFileName
    })
  }
}
