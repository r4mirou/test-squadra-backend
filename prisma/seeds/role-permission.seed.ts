import { Prisma } from '@prisma/client';
import { Role, Permission } from './_types';

export async function seedRolePermission(
  tx: Prisma.TransactionClient,
  allRegisteredRoles: Role[],
  allRegisteredPermissions: Permission[],
) {
  const allRolesPermissions = [
    {
      roleName: 'ADMIN',
      permissionNames: [
        'READ_USER',
        'EDIT_USER',
        'CREATE_USER',
        'DELETE_USER',
        'READ_ARTICLE',
        'EDIT_ARTICLE',
        'CREATE_ARTICLE',
        'DELETE_ARTICLE',
      ],
    },
    {
      roleName: 'EDITOR',
      permissionNames: ['READ_ARTICLE', 'EDIT_ARTICLE', 'CREATE_ARTICLE', 'DELETE_ARTICLE'],
    },
    { roleName: 'READER', permissionNames: ['READ_ARTICLE'] },
  ];

  for (const { roleName, permissionNames } of allRolesPermissions) {
    const role = allRegisteredRoles.find((r) => r.name === roleName);

    for (const permissionName of permissionNames) {
      const permission = allRegisteredPermissions.find((perm) => perm.name === permissionName);

      await tx.rolePermission.create({
        data: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }
  }
}
