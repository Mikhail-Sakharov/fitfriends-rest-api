import {Injectable, NotFoundException} from '@nestjs/common';
import UpdateUserDto from 'src/dto/update-user.dto';
import {UserEntity} from './user.entity';
import {UsersRepository} from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getUsers() {
    return this.usersRepository.find();
  }

  public async getUser(id: string) {
    const user = this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('No user with such id');
    }

    return user;
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('No user with such id');
    }

    const userEntity = new UserEntity({...user, ...dto});

    return this.usersRepository.update(id, userEntity);
  }
}
