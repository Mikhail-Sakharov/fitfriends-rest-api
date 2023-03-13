import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {hash, genSalt, compare} from 'bcrypt';
import LoginUserDto from 'src/dto/login-user.dto';
import {Payload} from 'src/types/payload.interface';
import {UserEntity} from 'src/users/user.entity';
import {UsersRepository} from 'src/users/users.repository';
import {UsersService} from 'src/users/users.service';
import CreateUserDto from '../dto/create-user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async register(dto: CreateUserDto) {
    const email = dto.email;
    const password = dto.password;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User with the email already exists!');
    }

    const userEntity = await new UserEntity({
      ...dto,
      passwordHash: ''
    }).setPassword(password);

    await this.usersRepository.create(userEntity);

    const loggedUser = await this.loginUser({
      email,
      password
    });

    return loggedUser;
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

    // нужен рефакторинг
    const payload = {
      sub: user._id,
      email: user.email,
      userName: user.userName,
      userRole: user.userRole
    };

    const tokens = await this.getTokens(payload);

    await this.updateRefreshToken(user._id, tokens.refreshToken);

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

  public async updateRefreshToken(userId: string, refreshToken: string) {
    const salt = await genSalt(SALT_ROUNDS);
    const hashedRefreshToken = await hash(refreshToken, salt);
    await this.usersService.updateUser(userId, {
      refreshToken: hashedRefreshToken
    });
  }

  public async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    // нужен рефакторинг
    const payload = {
      sub: user._id,
      email: user.email,
      userName: user.userName,
      userRole: user.userRole
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }
}
