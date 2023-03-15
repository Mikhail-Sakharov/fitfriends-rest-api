import {registerAs} from '@nestjs/config';

export default registerAs('multer', () => ({
  uploadDirectory: process.env.UPLOAD_DIRECORY
}));
