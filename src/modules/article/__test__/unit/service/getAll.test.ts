import { PrismaService } from 'src/config/database/prisma.service';
import { createUnitTestingModule } from '../../_factory/create-article-test-module';

import { ArticleService } from 'src/modules/article/article.service';

import responseArticleDtoMock from '../../_mocks/response-article.mock';

describe('create article unit tests (article.service.ts)', () => {
  let prisma: PrismaService;
  let articleService: ArticleService;

  beforeEach(async () => {
    const module = await createUnitTestingModule();

    prisma = module.get<PrismaService>(PrismaService);
    articleService = module.get<ArticleService>(ArticleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call database once when invoque method getAll', async () => {
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.findMany = jest.fn().mockReturnValueOnce([responseArticleMock]);

    await articleService.getAll();

    expect(prisma.article.findMany).toHaveBeenCalled();
  });

  it('Should return article mocked when invoque method getAll', async () => {
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.findMany = jest.fn().mockReturnValueOnce([responseArticleMock]);

    const articles = await articleService.getAll();

    expect(articles).toEqual([responseArticleMock]);
  });

  it('Should return not found when invoque method getAll', async () => {
    prisma.article.findMany = jest.fn().mockReturnValueOnce([]);

    const promise = articleService.getAll();

    await expect(promise).rejects.toThrow(new Error('Nenhum artigo encontrado'));
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const error = new Error('Internal Server Error');
    prisma.article.findMany = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.getAll();

    await expect(promise).rejects.toThrow(new Error('Falha ao buscar artigos'));
  });
});
