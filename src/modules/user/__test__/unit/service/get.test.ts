import { PrismaService } from 'src/config/database/prisma.service';

import { createUnitTestingModule } from '../../_factory/create-user-test-module';
import responseUserDtoMock from '../../_mocks/response-user.mock';

import { UserService } from 'src/modules/user/user.service';

describe('get user unit tests (user.service.ts)', () => {
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

  it('Should call database once when invoque method get', async () => {
    const id = 1;
    const responseUserMock = responseUserDtoMock();

    prisma.user.findUnique = jest.fn().mockReturnValueOnce(responseUserMock);

    await userService.get(id);

    expect(prisma.user.findUnique).toHaveBeenCalled();
  });

  it('Should return user mocked when invoque method get', async () => {
    const id = 1;
    const responseUserMock = responseUserDtoMock();

    prisma.user.findUnique = jest.fn().mockReturnValueOnce(responseUserMock);

    const user = await userService.get(id);

    expect(user).toEqual(responseUserMock);
  });

  it('Should return not found when invoque method get', async () => {
    const id = 1;
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);

    const promise = userService.get(id);

    await expect(promise).rejects.toThrow(new Error('Usuário não encontrado'));
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const id = 1;
    const error = new Error('Internal Server Error');
    prisma.user.findUnique = jest.fn().mockRejectedValueOnce(error);

    const promise = userService.get(id);

    await expect(promise).rejects.toThrow(new Error('Falha ao buscar usuário'));
  });
});
