import * as Joi from 'joi';

const DEFAULT_MONGO_DB_HOST = 'localhost';
const DEFAULT_MONGO_DB_PORT = 27017;
const DEFAULT_UPLOAD_DIRECORY = './files';

export default Joi.object({
  PORT: Joi.number().port(),
  MONGO_DB: Joi.string().required(),
  MONGO_HOST: Joi.string().hostname().default(DEFAULT_MONGO_DB_HOST).required(),
  MONGO_PORT: Joi.number().port().default(DEFAULT_MONGO_DB_PORT).required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_AUTH_BASE: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
  UPLOAD_DIRECORY: Joi.string().default(DEFAULT_UPLOAD_DIRECORY).required()
});
