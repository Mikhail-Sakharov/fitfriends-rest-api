import * as Joi from 'joi';

const DEFAULT_MONGO_DB_HOST = 'localhost';
const DEFAULT_MONGO_DB_PORT = 27019;
const DEFAULT_UPLOAD_DIRECORY = './files';
const DEFAULT_RABBIT_HOST = 'localhost:5672';

export default Joi.object({
  PORT: Joi.number().port(),
  MONGO_DB: Joi.string().required(),
  MONGO_HOST: Joi.string().hostname().default(DEFAULT_MONGO_DB_HOST).required(),
  MONGO_PORT: Joi.number().port().default(DEFAULT_MONGO_DB_PORT).required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_AUTH_BASE: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  UPLOAD_DIRECORY: Joi.string().default(DEFAULT_UPLOAD_DIRECORY).required(),
  RABBIT_HOST: Joi.string().default(DEFAULT_RABBIT_HOST).required(),
  RABBIT_USER: Joi.string().required(),
  RABBIT_PASSWORD: Joi.string().required(),
  RABBIT_TRAININGS_SERVICE_QUEUE: Joi.string().required(),
});
