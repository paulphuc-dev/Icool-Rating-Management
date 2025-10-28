import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  IUserPayload,
  AuthenticatedRequest,
} from '../interfaces/payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = req.headers.authorization as string;

    if (!authHeader) throw new UnauthorizedException('No authorization header');

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid token format');

    const payload = this.authService.verifyToken<IUserPayload>(token);
    (req as AuthenticatedRequest & { user?: IUserPayload }).user = payload;

    return true;
  }
}
