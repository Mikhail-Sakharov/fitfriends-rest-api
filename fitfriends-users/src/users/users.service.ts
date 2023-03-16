import * as fs from 'fs';
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

  public async addFriend(myId: string, myNewFriendId: string) {
    const myData = await this.usersRepository.findById(myId);
    const myNewFriendData = await this.usersRepository.findById(myNewFriendId);
    if (!myNewFriendData) {
      throw new NotFoundException('No user with such id');
    }

    const myFriends = [...myData.myFriends];
    const friendsOfMyNewFriend = [...myNewFriendData.myFriends];
    const userInMyFriends = myFriends.some((friendId) => friendId === myNewFriendId);
    const meInUserFriends = friendsOfMyNewFriend.some((friendId) => friendId === myId);
    const weAreFriends = userInMyFriends && meInUserFriends;
    if (weAreFriends) {
      throw new BadRequestException('The user is in friends');
    }

    const myUpdatedFriends = myFriends.filter((friendId) => friendId !== myNewFriendId);
    const userUpdatedFriends = friendsOfMyNewFriend.filter((friendId) => friendId !== myId);

    myUpdatedFriends.push(myNewFriendId);
    userUpdatedFriends.push(myId);

    await this.updateUser(myId, {myFriends: myUpdatedFriends});
    await this.updateUser(myNewFriendId, {myFriends: userUpdatedFriends});
  }

  public async removeFriend(myId: string, removedFriendId: string) {
    const myData = await this.usersRepository.findById(myId);
    const removedFriendData = await this.usersRepository.findById(removedFriendId);
    if (!removedFriendData) {
      throw new NotFoundException('No user with such id');
    }

    const myFriends = [...myData.myFriends];
    const friendsOfRemovedFriend = [...removedFriendData.myFriends];
    const userInMyFriends = myFriends.some((friendId) => friendId === removedFriendId);
    const meInUserFriends = friendsOfRemovedFriend.some((friendId) => friendId === myId);
    const weAreFriends = userInMyFriends || meInUserFriends;
    if (!weAreFriends) {
      throw new BadRequestException('The user isn\'t in friends');
    }

    const myUpdatedFriends = myFriends.filter((friendId) => friendId !== removedFriendId);
    const userUpdatedFriends = friendsOfRemovedFriend.filter((friendId) => friendId !== myId);

    await this.updateUser(myId, {myFriends: myUpdatedFriends});
    await this.updateUser(removedFriendId, {myFriends: userUpdatedFriends});
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

  public async setAvatarPath(userId: string, avatarUrl: string) {
    const user = await this.usersRepository.findById(userId);
    const prevAvatarUrl = user.avatarUrl;

    if (fs.existsSync(prevAvatarUrl)) {
      console.log('yes');
      fs.unlink(prevAvatarUrl, (err) => {
        if (err) {
         console.error(err);
         return err;
        }
      });
    }
    return this.updateUser(userId, {avatarUrl});
  }
}
