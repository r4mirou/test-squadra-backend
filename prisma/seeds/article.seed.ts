import { Prisma } from '@prisma/client';
import { User } from './_types';

export async function seedArticle(tx: Prisma.TransactionClient, users: User[]) {
  for (const user of users) {
    const articles = await tx.article.findMany({
      where: { userId: user.id },
    });

    if (articles.length === 0) {
      await tx.article.create({
        data: {
          title: `Artigo do ${user.name}`,
          content: `Conteúdo do artigo ${user.name}`,
          userId: user.id,
        },
      });
    }
  }
}
