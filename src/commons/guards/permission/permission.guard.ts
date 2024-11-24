import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionKeyEnum } from 'src/commons/enums/permission-key';
import { PermissionEnum } from 'src/commons/enums/permission.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<PermissionEnum[]>(
      PermissionKeyEnum.KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest();

    return requiredPermissions.some((permission) => user.permissions?.includes(permission));
  }
}
