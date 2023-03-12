import {Injectable} from '@nestjs/common';
import {UserEntity} from 'src/users/user.entity';
import {UsersRepository} from 'src/users/users.repository';
import CreateUserDto from '../dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  async register(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new Error('User with the email already exists!');
    }

    const userEntity = await new UserEntity({
      ...dto,
      passwordHash: ''
    }).setPassword(dto.password);

    const createdUser = await this.userRepository.create(userEntity);

    return createdUser;
  }
}
