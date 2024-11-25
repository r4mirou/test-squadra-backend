import { PrismaService } from 'src/config/database/prisma.service';
import { createUnitTestingModule } from '../../_factory/create-article-test-module';

import { ArticleService } from 'src/modules/article/article.service';

import createArticleDtoMock from '../../_mocks/create-article.mock';
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

  it('Should call database once when invoque method create', async () => {
    const createArticleMock = createArticleDtoMock();
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.create = jest.fn().mockReturnValueOnce(responseArticleMock);

    await articleService.create(createArticleMock);

    expect(prisma.article.create).toHaveBeenCalled();
  });

  it('Should return article with id when invoque method create', async () => {
    const createArticleMock = createArticleDtoMock();
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.create = jest.fn().mockReturnValueOnce(responseArticleMock);

    const article = await articleService.create(createArticleMock);

    expect(article).toEqual(responseArticleMock);
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const createArticleMock = createArticleDtoMock();

    const error = new Error('Internal Server Error');
    prisma.article.create = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.create(createArticleMock);

    await expect(promise).rejects.toThrow(new Error('Falha ao criar artigo'));
  });

  it('Should throw an error when the database has an error code P2002', async () => {
    const createArticleMock = createArticleDtoMock();

    const error = { code: 'P2003', message: 'violated foreign key' };
    prisma.article.create = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.create(createArticleMock);

    await expect(promise).rejects.toThrow(new Error('Usuário incorreto'));
  });
});
