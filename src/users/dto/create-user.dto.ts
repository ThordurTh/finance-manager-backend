import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: Role;

  constructor(username: string, password: string, role: Role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
