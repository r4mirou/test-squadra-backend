import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from '../enums/permission.enum';
import { PermissionKeyEnum } from '../enums/permission-key';

export const Permissions = (...permissions: PermissionEnum[]) =>
  SetMetadata(PermissionKeyEnum.KEY, permissions);
