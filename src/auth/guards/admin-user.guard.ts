import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  constructor(
    private readonly userService: UsersService, // Inject your user service
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Call the super's canActivate method to perform JWT token verification
    const canActivate = await super.canActivate(context);

    if (!canActivate) {
      return false; // If token verification fails, return false
    }

    // Extract user ID from the JWT token payload
    const request = context.switchToHttp().getRequest();
    const userId = this.getUserIdFromToken(request.headers.authorization);

    // Retrieve user details (including role) from the database
    const user = await this.userService.findById(userId);
    // console.log(
    //   this.jwtService.decode(request.headers.authorization.split(' ')[1]).id,
    // );

    // Check if the user has the 'admin' role
    return user.role === 'admin';
  }

  private getUserIdFromToken(authHeader: string): number | null {
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1]; // Extract JWT token
    const payload = this.jwtService.decode(token); // Decode JWT token
    return payload.id; // Extract user ID from token payload
  }
}
