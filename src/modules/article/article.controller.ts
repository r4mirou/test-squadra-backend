import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ParseIntPipe,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ValidateFieldsPipe } from 'src/commons/pipes/validate-fields.pipe';
import { logText } from 'src/commons/utils/generic-functions.utils';

import { AuthGuard } from 'src/commons/guards/auth/auth.guard';
import { PermissionEnum } from 'src/commons/enums/permission.enum';
import { Permissions } from 'src/commons/decorators/permission.decorator';
import { PermissionGuard } from 'src/commons/guards/permission/permission.guard';

import { ArticleService } from './article.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ResponseArticleDto } from './dto/response-article.dto';

@ApiTags('Articles')
@Controller('articles')
@ApiBearerAuth('access-token')
@UsePipes(ValidateFieldsPipe)
@UseGuards(AuthGuard, PermissionGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  private readonly logger = new Logger(ArticleController.name);

  @Post()
  @Permissions(PermissionEnum.CREATE_ARTICLE)
  @ApiCreatedResponse({ type: ResponseArticleDto })
  async create(@Body() data: CreateArticleDto) {
    this.logger.log('[create] starting article creation', logText(data));

    const createdArticle = await this.articleService.create(data);

    this.logger.log('[create] article created successfully', logText(createdArticle));

    return createdArticle;
  }

  @Get('')
  @Permissions(PermissionEnum.READ_ARTICLE)
  @ApiCreatedResponse({ type: ResponseArticleDto })
  async getAll() {
    this.logger.log('[getAll] starting articles research');

    const articles = await this.articleService.getAll();

    this.logger.log('[getAll] articles found ', logText(articles));

    return articles;
  }

  @Get('/:articleId')
  @Permissions(PermissionEnum.READ_ARTICLE)
  @ApiCreatedResponse({ type: ResponseArticleDto })
  async get(@Param('articleId', ParseIntPipe) articleId: number) {
    this.logger.log('[get] starting article research', logText({ articleId }));

    const article = await this.articleService.get(articleId);

    this.logger.log('[get] article found', logText(article));

    return article;
  }

  @Patch('/:articleId')
  @Permissions(PermissionEnum.EDIT_ARTICLE)
  @ApiCreatedResponse({ type: ResponseArticleDto })
  async update(
    @Body() data: UpdateArticleDto,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    this.logger.log('[update]  starting update article', logText({ articleId }), logText(data));

    const updatedArticle = await this.articleService.update(articleId, data);

    this.logger.log('[update] article updated successfully', logText(updatedArticle));

    return updatedArticle;
  }

  @Delete('/:articleId')
  @Permissions(PermissionEnum.DELETE_ARTICLE)
  @ApiCreatedResponse({ type: ResponseArticleDto })
  async delete(@Param('articleId', ParseIntPipe) articleId: number) {
    this.logger.log('[delete] starting delete article', logText({ articleId }));

    const deletedArticle = await this.articleService.delete(articleId);

    this.logger.log('[delete] article deleted successfully', logText({ deletedArticle }));

    return deletedArticle;
  }
}
