import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import UpdateUserDto from 'src/dto/update-user.dto';
import {UserEntity} from './user.entity';
import {UsersRepository} from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getFriends(id: string) {
    return await this.usersRepository.findFriends(id);
  }

  public async becomeFriends(myId: string, myNewFriendId: string) {
    const myNewFriend = await this.usersRepository.findById(myNewFriendId);
    if (!myNewFriend) {
      throw new NotFoundException('No user with such id');
    }

    const friendsOfMyNewFriend = [...myNewFriend.myFriends];
    const weAreFriends = friendsOfMyNewFriend.some((friend) => friend === myId);
    if (weAreFriends) {
      throw new BadRequestException('The user is in friends');
    }

    const myData = await this.usersRepository.findById(myId);
    const myFriends = [...myData.myFriends];
    myFriends.push(myNewFriendId);
    friendsOfMyNewFriend.push(myId);

    await this.updateUser(myId, {myFriends});
    await this.updateUser(myNewFriendId, {myFriends: friendsOfMyNewFriend});
  }

  public async getUsers() {
    return await this.usersRepository.find();
  }

  public async getUser(id: string) {
    const user = await this.usersRepository.findById(id);

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
