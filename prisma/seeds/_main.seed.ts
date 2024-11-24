import { PrismaClient } from '@prisma/client';
import { seedPermission } from './permission.seed';
import { seedRole } from './role.seed';
import { seedRolePermission } from './role-permission.seed';
import { seedUser } from './user.seed';
import { seedArticle } from './article.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const allRegisteredPermissions = await seedPermission(tx);
    const allRegisteredRoles = await seedRole(tx);
    await seedRolePermission(tx, allRegisteredRoles, allRegisteredPermissions);
    const users = await seedUser(tx, allRegisteredRoles);
    await seedArticle(tx, users);
  });

  console.log('Dados de seed inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
