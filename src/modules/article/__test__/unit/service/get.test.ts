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

  it('Should call database once when invoque method get', async () => {
    const id = 1;
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.findUnique = jest.fn().mockReturnValueOnce(responseArticleMock);

    await articleService.get(id);

    expect(prisma.article.findUnique).toHaveBeenCalled();
  });

  it('Should return article mocked when invoque method get', async () => {
    const id = 1;
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.findUnique = jest.fn().mockReturnValueOnce(responseArticleMock);

    const article = await articleService.get(id);

    expect(article).toEqual(responseArticleMock);
  });

  it('Should return not found when invoque method get', async () => {
    const id = 1;
    prisma.article.findUnique = jest.fn().mockReturnValueOnce(null);

    const promise = articleService.get(id);

    await expect(promise).rejects.toThrow(new Error('Artigo não encontrado'));
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const id = 1;
    const error = new Error('Internal Server Error');
    prisma.article.findUnique = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.get(id);

    await expect(promise).rejects.toThrow(new Error('Falha ao buscar artigo'));
  });
});
