import { PrismaService } from 'src/config/database/prisma.service';

import { createUnitTestingModule } from '../../_factory/create-user-test-module';
import responseUserDtoMock from '../../_mocks/response-user.mock';

import { UserService } from 'src/modules/user/user.service';

describe('getAll users unit tests (user.service.ts)', () => {
  let prisma: PrismaService;
  let userService: UserService;

  beforeEach(async () => {
    const module = await createUnitTestingModule();

    prisma = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call database once when invoque method getAll', async () => {
    const responseUserMock = responseUserDtoMock();

    prisma.user.findMany = jest.fn().mockReturnValueOnce([responseUserMock]);

    await userService.getAll();

    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('Should return user mocked when invoque method getAll', async () => {
    const responseUserMock = responseUserDtoMock();

    prisma.user.findMany = jest.fn().mockReturnValueOnce([responseUserMock]);

    const users = await userService.getAll();

    expect(users).toEqual([responseUserMock]);
  });

  it('Should return not found when invoque method getAll', async () => {
    prisma.user.findMany = jest.fn().mockReturnValueOnce([]);

    const promise = userService.getAll();

    await expect(promise).rejects.toThrow(new Error('Nenhum usuário encontrado'));
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const error = new Error('Internal Server Error');
    prisma.user.findMany = jest.fn().mockRejectedValueOnce(error);

    const promise = userService.getAll();

    await expect(promise).rejects.toThrow(new Error('Falha ao buscar usuários'));
  });
});
