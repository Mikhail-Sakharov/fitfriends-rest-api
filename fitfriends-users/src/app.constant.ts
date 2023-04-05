export const ENV_FILE_PATH = 'environments/.env';

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export const UserNameLength = {
  MIN: 1,
  MAX: 15
};

export const UserPasswordLength = {
  MIN: 6,
  MAX: 12
};

export const CoachDescriptionLength = {
  MIN: 10,
  MAX: 140
};

export const UserDailyCaloriesCount = {
  MIN: 1000,
  MAX: 5000
};

export const UserTotalCaloriesCount = {
  MIN: 1000,
  MAX: 5000
};

export const MAX_TRAINING_TYPES_LENGTH = 3;

export const MAX_SERTIFICATES_LENGTH = 1;

export const EMAIL_REG_EXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;

export const AVATAR_URL_REG_EXP = /^.+(?:.jpg)|.+(?:.png)$/;

export const CERTIFICATE_URL_REG_EXP = /^.+(?:.pdf)$/;

export const AVATAR_MAX_SIZE = 1000000;

export const BIRTHDAY_REG_EXP = /^\d{2}.\d{2}.\d{4}$/;

export const UPLOAD_DIRECTORY_REG_EXP = /\w+/;
