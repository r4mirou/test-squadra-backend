import { PrismaService } from 'src/config/database/prisma.service';
import { createUnitTestingModule } from '../../_factory/create-article-test-module';

import { ArticleService } from 'src/modules/article/article.service';

import responseArticleDtoMock from '../../_mocks/response-article.mock';
import updateArticleDtoMock from '../../_mocks/update-article.mock';

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

  it('Should call database once when invoque method update', async () => {
    const id = 1;
    const updateArticleMock = updateArticleDtoMock();
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.update = jest.fn().mockReturnValueOnce(responseArticleMock);

    await articleService.update(id, updateArticleMock);

    expect(prisma.article.update).toHaveBeenCalled();
  });

  it('Should return article mocked when invoque method update', async () => {
    const id = 1;
    const updateArticleMock = updateArticleDtoMock();
    const responseArticleMock = responseArticleDtoMock();

    prisma.article.update = jest.fn().mockReturnValueOnce(responseArticleMock);

    const article = await articleService.update(id, updateArticleMock);

    expect(article).toEqual(responseArticleMock);
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const id = 1;
    const updateArticleMock = updateArticleDtoMock();

    const error = new Error('Internal Server Error');
    prisma.article.update = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.update(id, updateArticleMock);

    await expect(promise).rejects.toThrow(new Error('Falha ao atualizar artigo'));
  });

  it('Should throw an error when the database has an error code P2002', async () => {
    const id = 1;
    const updateArticleMock = updateArticleDtoMock();

    const error = { code: 'P2003', message: 'violated foreign key' };
    prisma.article.update = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.update(id, updateArticleMock);

    await expect(promise).rejects.toThrow(new Error('Usuário incorreto'));
  });

  it('Should throw an error when the database has an error code P2025', async () => {
    const id = 1;
    const updateArticleMock = updateArticleDtoMock();

    const error = { code: 'P2025', message: 'Record to update not found' };
    prisma.article.update = jest.fn().mockRejectedValueOnce(error);

    const promise = articleService.update(id, updateArticleMock);

    await expect(promise).rejects.toThrow(new Error('Artigo não encontrado'));
  });
});
