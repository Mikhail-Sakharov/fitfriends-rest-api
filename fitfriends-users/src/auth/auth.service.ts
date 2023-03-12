import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import LoginUserDto from 'src/dto/login-user.dto';
import {UserEntity} from 'src/users/user.entity';
import {UsersRepository} from 'src/users/users.repository';
import CreateUserDto from '../dto/create-user.dto';

type Payload = {
  sub: string;
  email: string;
  userName: string;
  userRole: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async register(dto: CreateUserDto) {
    const userExists = await this.usersRepository.findByEmail(dto.email);

    if (userExists) {
      throw new Error('User with the email already exists!');
    }

    const userEntity = await new UserEntity({
      ...dto,
      passwordHash: ''
    }).setPassword(dto.password);

    const createdUser = await this.usersRepository.create(userEntity);

    return createdUser;
  }

  public async loginUser(dto: LoginUserDto) {
    const user = await this.usersRepository.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('No user with such email');
    }

    const userEntity = new UserEntity(user);
    const isPasswordCorrect = userEntity.comparePassword(dto.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('The provided password is incorrect!');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      userName: user.userName,
      userRole: user.userRole
    };

    const tokens = await this.getTokens(payload);

    return {
      user,
      tokens
    };
  }

  public async getTokens(payload: Payload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.accessTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.accessTokenExpiresIn')
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn')
      })
    ]);

    return {
      accessToken,
      refreshToken
    };
  }
}
