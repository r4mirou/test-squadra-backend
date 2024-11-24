import { Prisma } from '@prisma/client';
import { Permission } from './_types';

export async function seedPermission(tx: Prisma.TransactionClient): Promise<Permission[]> {
  const allPermissions = [
    { name: 'READ_USER', description: 'Permissão de leitura de usuário' },
    { name: 'EDIT_USER', description: 'Permissão de edição de usuário' },
    { name: 'CREATE_USER', description: 'Permissão de criação de usuário' },
    { name: 'DELETE_USER', description: 'Permissão de deleção de usuário' },
    { name: 'READ_ARTICLE', description: 'Permissão de leitura de artigo' },
    { name: 'EDIT_ARTICLE', description: 'Permissão de edição de artigo' },
    { name: 'CREATE_ARTICLE', description: 'Permissão de criação de artigo' },
    { name: 'DELETE_ARTICLE', description: 'Permissão de deleção de artigo' },
  ];

  const registeredPermissions = await findRegisteredPermissions(tx);

  const unregisteredPermissions = findUnregisteredPermissions(
    allPermissions,
    registeredPermissions,
  );

  const newRegisteredPermissions = await registerPedingPermissions(tx, unregisteredPermissions);

  const allRegisteredPermissions = [...registeredPermissions, ...newRegisteredPermissions];

  return allRegisteredPermissions;
}

async function findRegisteredPermissions(tx: Prisma.TransactionClient): Promise<Permission[]> {
  const registeredPermissions = await tx.permission.findMany({});

  return registeredPermissions;
}

function findUnregisteredPermissions(
  allPermissions: Permission[],
  registeredPermissions: Permission[],
): Permission[] {
  const unregisteredPermissions = allPermissions.filter(
    (permission) => !registeredPermissions.some((perm) => perm.name === permission.name),
  );

  return unregisteredPermissions;
}

async function registerPedingPermissions(
  tx: Prisma.TransactionClient,
  unregisteredPermissions: Permission[],
): Promise<Permission[]> {
  if (unregisteredPermissions.length === 0) return [];

  const newRegisteredPermissions: Permission[] = [];

  for (const permission of unregisteredPermissions) {
    const addedPerm = await tx.permission.create({ data: permission });
    newRegisteredPermissions.push(addedPerm);
  }

  return newRegisteredPermissions;
}
