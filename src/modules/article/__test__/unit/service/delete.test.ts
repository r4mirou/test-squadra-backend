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

  it('Should call database once when invoque method delete', async () => {
    const id = 1;
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.delete = jest.fn().mockReturnValueOnce(responseArticleMock);

    await articleService.delete(id);

    expect(prisma.article.delete).toHaveBeenCalled();
  });

  it('Should return article mocked when invoque method delete', async () => {
    const id = 1;
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.delete = jest.fn().mockReturnValueOnce(responseArticleMock);

    const user = await articleService.delete(id);

    expect(user).toEqual(responseArticleMock);
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const id = 1;

    const error = new Error('Internal Server Error');
    prisma.article.delete = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.delete(id);

    await expect(promise).rejects.toThrow(new Error('Falha ao deletar artigo'));
  });

  it('Should throw an error when the database has an error code P2025', async () => {
    const id = 1;

    const error = { code: 'P2025', message: 'Record to update not found' };
    prisma.article.delete = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.delete(id);

    await expect(promise).rejects.toThrow(new Error('Artigo não encontrado'));
  });
});
