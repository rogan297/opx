import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const bypassTenant = this.reflector.getAllAndOverride<boolean>('bypassTenant', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (bypassTenant) return true;

    const request = context.switchToHttp().getRequest();
    const tenantId = request.user?.tenantId;
    if (!tenantId) return false;
    request.tenantId = tenantId;
    return true;
  }
}
