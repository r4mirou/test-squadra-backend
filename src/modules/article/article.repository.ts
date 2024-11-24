import { Injectable } from '@nestjs/common';
import { Article, PrismaClient } from '@prisma/client';
import BaseRepository from 'src/commons/base-classes/base-repository';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class ArticleRepository extends BaseRepository<Article, PrismaClient['article']> {
  constructor(database: PrismaService) {
    super(database.article);
  }

  async getAll() {
    const row = await this.model.findMany();
    return row;
  }
}
