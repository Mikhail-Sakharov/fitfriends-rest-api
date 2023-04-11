import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {hash, genSalt, compare} from 'bcrypt';
import LoginUserDto from 'src/dto/login-user.dto';
import {User} from 'src/types/user.interface';
import {UserEntity} from 'src/users/user.entity';
import {UsersRepository} from 'src/users/users.repository';
import {UsersService} from 'src/users/users.service';
import CreateUserDto from '../dto/create-user.dto';
import {UserRole} from 'src/types/user-role.enum';
import {CommandEvent} from 'src/types/command-event.enum';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {ClientProxy} from '@nestjs/microservices';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
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

    if (loggedUser.user.userRole === UserRole.Coach) {
      this.rabbitClient.emit(
        {cmd: CommandEvent.CreateCoach},
        {
          coachId: loggedUser.user._id,
          coachName: loggedUser.user.userName,
          coachEmail: loggedUser.user.email,
          avatarUrl: loggedUser.user.avatarUrl,
          gender: loggedUser.user.gender,
          birthday: loggedUser.user.birthday,
          location: loggedUser.user.location,
          trainingLevel: loggedUser.user.trainingLevel,
          trainingTypes: loggedUser.user.trainingTypes
        }
      );
    }

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

    const tokens = await this.getTokens(user);

    await this.updateRefreshToken(user._id, tokens.refreshToken);

    return {
      user,
      tokens
    };
  }

  public async getTokens(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      userName: user.userName,
      userRole: user.userRole
    };

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

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return {
      user,
      tokens
    };
  }

  public async logout(userId: string) {
    return await this.usersService.updateUser(userId, {refreshToken: null});
  }
}
