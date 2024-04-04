import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService
    ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the roles from the metadata
    const roles = this.getRole(context);

    // If no role is required, grant access
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // If no token is provided, deny access
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // Get the user from the token
    const payload = this.authService.verifyToken(token);

    // Set the user in the request object for future use
    request.user = payload;

    // If the user has the required role, grant access
    if (roles.includes(payload.role)) {
      return true;
    }

    // Otherwise, deny access
    throw new UnauthorizedException('Unauthorized');
  }

  /**
   * Check if the route requires a role
   * @param context The execution context
   * @returns The roles required for the route
   */
  getRole(context: ExecutionContext) {
    return this.reflector.get(Roles, context.getHandler());
  }

  /**
 * Get the token from the request header
 * @param request The request object
 * @returns The token from the request header
 */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
