import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { logMask, logText } from 'src/commons/utils/generic-functions.utils';

import { ArticleRepository } from './article.repository';

import { ArticleDto } from './dto/article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ResponseArticleDto } from './dto/response-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly repository: ArticleRepository) {}
  private readonly logger = new Logger(ArticleService.name);

  async create(data: CreateArticleDto): Promise<ResponseArticleDto> {
    this.logger.log('[create] starting article creation', logText(data));

    try {
      const createdArticle = await this.repository.create(data);
      this.logger.log('[create] sarticle created successfully', logText(createdArticle));

      return createdArticle;
    } catch (error) {
      this.logger.error('[create] failed to create article', logText(error));

      //refatorar erros prisma
      if (error?.code === 'P2003') throw new ConflictException('Usuário incorreto');

      throw new InternalServerErrorException('Falha ao criar artigo');
    }
  }

  async getAll(): Promise<ResponseArticleDto[]> {
    this.logger.log('[getAll] starting articles research');

    let articles: ArticleDto[];

    try {
      articles = await this.repository.getAll();
    } catch (error) {
      this.logger.error('[getAll] articles research failure', logText(error));
      throw new InternalServerErrorException('Falha ao buscar artigos');
    }

    if (!articles || articles.length === 0) {
      this.logger.warn('[getAll] articles not found');
      throw new NotFoundException('Nenhum artigo encontrado');
    }

    this.logger.log('[getAll] articles found ', logText(articles));
    return articles;
  }

  async get(articleId: number): Promise<ResponseArticleDto> {
    this.logger.log('[get] starting article research', logText({ articleId }));

    let article: ArticleDto;

    try {
      article = await this.repository.get(articleId);
    } catch (error) {
      this.logger.error('[get] article research failure', logText(error));
      throw new InternalServerErrorException('Falha ao buscar artigo');
    }

    if (!article) {
      this.logger.warn('[get] article not found');
      throw new NotFoundException('Artigo não encontrado');
    }

    this.logger.log('[get] article found ', logText(article));
    return article;
  }

  async update(articleId: number, data: UpdateArticleDto): Promise<ResponseArticleDto> {
    this.logger.log('[update] starting update article', logText({ articleId }), logText(data));

    try {
      const updatedArticle = await this.repository.update(articleId, data);

      this.logger.log('[update] article updated successfully', logText(updatedArticle));

      return updatedArticle;
    } catch (error) {
      this.logger.error('[update] article update failure', logText(error));

      //refatorar erros prisma
      if (error?.code === 'P2003') throw new ConflictException('Usuário incorreto');
      if (error?.code === 'P2025') throw new ConflictException('Artigo não encontrado');

      throw new InternalServerErrorException('Falha ao atualizar artigo');
    }
  }

  async delete(articleId: number): Promise<ResponseArticleDto> {
    this.logger.log('[delete] starting delete article', logText({ articleId }));

    let deletedArticle: ArticleDto;

    try {
      deletedArticle = await this.repository.delete(articleId);
    } catch (error) {
      this.logger.error('[delete] article delete failure', logText(error));

      //refatorar erros prisma
      if (error?.code === 'P2025') throw new ConflictException('Artigo não encontrado');

      throw new InternalServerErrorException('Falha ao deletar artigo');
    }

    this.logger.log('[get] article deleted successfully', logText(deletedArticle));
    return deletedArticle;
  }
}
