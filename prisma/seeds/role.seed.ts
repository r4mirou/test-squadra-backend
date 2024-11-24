import { Prisma } from '@prisma/client';
import { Role } from './_types';

export async function seedRole(tx: Prisma.TransactionClient): Promise<Role[]> {
  const allRoles = [
    { name: 'ADMIN', description: '' },
    { name: 'EDITOR', description: '' },
    { name: 'READER', description: '' },
  ];

  const registeredRoles = await findRegisteredRoles(tx);

  const unregisteredRoles = await findUnregisteredRoles(allRoles, registeredRoles);

  const newRegisteredRoles = await registerPedingRoles(tx, unregisteredRoles);

  const allRegisteredRoles = [...registeredRoles, ...newRegisteredRoles];

  return allRegisteredRoles;
}

async function findRegisteredRoles(tx: Prisma.TransactionClient): Promise<Role[]> {
  const registeredRoles = await tx.role.findMany({});

  return registeredRoles;
}

function findUnregisteredRoles(allRoles: Role[], registeredRoles: Role[]): Role[] {
  const unregisteredRoles = allRoles.filter(
    (role) => !registeredRoles.some((r) => r.name === role.name),
  );

  return unregisteredRoles;
}

async function registerPedingRoles(
  tx: Prisma.TransactionClient,
  unregisteredRoles: Role[],
): Promise<Role[]> {
  if (unregisteredRoles.length === 0) return [];

  const newRegisteredRoles: Role[] = [];

  for (const role of unregisteredRoles) {
    const addedRole = await tx.role.create({ data: role });
    newRegisteredRoles.push(addedRole);
  }

  return newRegisteredRoles;
}
