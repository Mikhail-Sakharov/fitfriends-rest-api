import {ClassConstructor, plainToInstance} from 'class-transformer';
import {extname} from 'path';
import * as crypto from 'crypto';
import {Request} from 'express';

type FileNameCallback = (error: Error | null, filename: string) => void;

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const editFileName = (_req: Request, file: Express.Multer.File, callback: FileNameCallback) => {
  const fileName = crypto.randomUUID();
  const fileExtName = extname(file.originalname);
  callback(null, `${fileName}${fileExtName}`);
};
