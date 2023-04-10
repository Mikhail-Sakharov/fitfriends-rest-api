import * as Joi from 'joi';

const DEFAULT_MONGO_DB_HOST = 'localhost';
const DEFAULT_MONGO_DB_PORT = 27021;

const DEFAULT_SMTP_HOST = 'localhost';
const DEFAULT_SMTP_PORT = 5025;

const DEFAULT_REDIS_HOST = 'localhost';
const DEFAULT_REDIS_PORT = 6379;

const DEFAULT_RABBIT_HOST = 'localhost:5672';

export default Joi.object({
  PORT: Joi.number().port(),
  MONGO_DB: Joi.string().required(),
  MONGO_HOST: Joi.string().hostname().default(DEFAULT_MONGO_DB_HOST).required(),
  MONGO_PORT: Joi.number().port().default(DEFAULT_MONGO_DB_PORT).required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_AUTH_BASE: Joi.string().required(),
  RABBIT_HOST: Joi.string().default(DEFAULT_RABBIT_HOST).required(),
  RABBIT_USER: Joi.string().required(),
  RABBIT_PASSWORD: Joi.string().required(),
  RABBIT_USERS_SERVICE_QUEUE: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  MAIL_SMTP_HOST: Joi.string().default(DEFAULT_SMTP_HOST).required(),
  MAIL_SMTP_PORT: Joi.number().port().default(DEFAULT_SMTP_PORT).required(),
  MAIL_USER_NAME: Joi.string().required(),
  MAIL_USER_PASSWORD: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),
  REDIS_HOST: Joi.string().hostname().default(DEFAULT_REDIS_HOST).required(),
  REDIS_PORT: Joi.number().port().default(DEFAULT_REDIS_PORT).required()
});
