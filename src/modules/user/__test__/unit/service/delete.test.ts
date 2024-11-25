import { PrismaService } from 'src/config/database/prisma.service';

import { createUnitTestingModule } from '../../_factory/create-user-test-module';
import updateUserDtoMock from '../../_mocks/update-user.mock';
import responseUserDtoMock from '../../_mocks/response-user.mock';

import { UserService } from 'src/modules/user/user.service';

describe('delete user unit tests (user.service.ts)', () => {
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

  it('Should call database once when invoque method delete', async () => {
    const id = 1;
    const responseUserMock = responseUserDtoMock();

    prisma.user.delete = jest.fn().mockReturnValueOnce(responseUserMock);

    await userService.delete(id);

    expect(prisma.user.delete).toHaveBeenCalled();
  });

  it('Should return user mocked when invoque method delete', async () => {
    const id = 1;
    const responseUserMock = responseUserDtoMock();

    prisma.user.delete = jest.fn().mockReturnValueOnce(responseUserMock);

    const user = await userService.delete(id);

    expect(user).toEqual(responseUserMock);
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const id = 1;

    const error = new Error('Internal Server Error');
    prisma.user.delete = jest.fn().mockRejectedValueOnce(error);

    const promise = userService.delete(id);

    await expect(promise).rejects.toThrow(new Error('Falha ao deletar usuário'));
  });

  it('Should throw an error when the database has an error code P2025', async () => {
    const id = 1;

    const error = { code: 'P2025', message: 'Record to update not found' };
    prisma.user.delete = jest.fn().mockRejectedValueOnce(error);

    const promise = userService.delete(id);

    await expect(promise).rejects.toThrow(new Error('Usuário não encontrado'));
  });
});
