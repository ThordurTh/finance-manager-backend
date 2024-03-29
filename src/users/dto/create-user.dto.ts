import { IsNotEmpty, IsString } from 'class-validator';
// import { Role } from '../../../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // @IsEnum(Role)
  // role: Role;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    // this.role = role;
  }
}
