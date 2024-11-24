import { Prisma } from '@prisma/client';
import { Role, User } from './_types';
import * as bcrypt from 'bcrypt';

export async function seedUser(
  tx: Prisma.TransactionClient,
  allRegisteredRoles: Role[],
): Promise<User[]> {
  let userAdmin = await tx.user.findUnique({
    where: { email: 'admin@email.com' },
  });

  if (!userAdmin) {
    const roleAdmin = allRegisteredRoles.find((r) => r.name === 'ADMIN');
    const roleId = roleAdmin.id;

    userAdmin = await tx.user.create({
      data: {
        name: 'User Admin',
        email: 'admin@email.com',
        password: await bcrypt.hash('admin123', 10),
        roleId,
      },
    });
  }

  let userEditor = await tx.user.findUnique({
    where: { email: 'editor@email.com' },
  });

  if (!userEditor) {
    const roleEditor = allRegisteredRoles.find((r) => r.name === 'EDITOR');
    const roleId = roleEditor.id;

    userEditor = await tx.user.create({
      data: {
        name: 'User Editor',
        email: 'editor@email.com',
        password: await bcrypt.hash('editor123', 10),
        roleId,
      },
    });
  }

  let userReader = await tx.user.findUnique({
    where: { email: 'reader@email.com' },
  });

  if (!userReader) {
    const roleReader = allRegisteredRoles.find((r) => r.name === 'READER');
    const roleId = roleReader.id;

    userReader = await tx.user.create({
      data: {
        name: 'User Reader',
        email: 'reader@email.com',
        password: await bcrypt.hash('reader123', 10),
        roleId,
      },
    });
  }

  return [userAdmin, userEditor, userReader];
}
