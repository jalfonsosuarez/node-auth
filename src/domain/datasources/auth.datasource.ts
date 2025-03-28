import { RegisterUserDto, LoginUserDto } from '..';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthDatasource {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
