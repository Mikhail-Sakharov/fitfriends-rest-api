import {ConfigService, registerAs} from '@nestjs/config';
import {RmqOptions, Transport} from '@nestjs/microservices';
     
export const rabbitMqOptions = registerAs('rmq', () => ({
  user: process.env.RABBIT_USER,
  password: process.env.RABBIT_PASSWORD,
  host: process.env.RABBIT_HOST,
  usersServiceQueue: process.env.RABBIT_USERS_SERVICE_QUEUE,
  trainingsServiceQueue: process.env.RABBIT_TRAININGS_SERVICE_QUEUE,
  notifierServiceQueue: process.env.RABBIT_NOTIFIER_SERVICE_QUEUE
}));
     
export function getUsersServiceRabbitMqConfig(configService: ConfigService): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const queue = configService.get<string>('rmq.usersServiceQueue');
  const url = `amqp://${user}:${password}@${host}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true
      }
    }
  }
}

export function getTrainingsServiceRabbitMqConfig(configService: ConfigService): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const queue = configService.get<string>('rmq.trainingsServiceQueue');
  const url = `amqp://${user}:${password}@${host}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true
      }
    }
  }
}

export function getNotifierServiceRabbitMqConfig(configService: ConfigService): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const queue = configService.get<string>('rmq.notifierServiceQueue');
  const url = `amqp://${user}:${password}@${host}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true
      }
    }
  }
}
