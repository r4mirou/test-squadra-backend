import { PrismaService } from 'src/config/database/prisma.service';

import { createUnitTestingModule } from '../../_factory/create-user-test-module';
import updateUserDtoMock from '../../_mocks/update-user.mock';
import responseUserDtoMock from '../../_mocks/response-user.mock';

import { UserService } from 'src/modules/user/user.service';

describe('update user unit tests (user.service.ts)', () => {
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

  it('Should call database once when invoque method update', async () => {
    const id = 1;
    const updateUserMock = updateUserDtoMock();
    const responseUserMock = responseUserDtoMock();

    prisma.user.update = jest.fn().mockReturnValueOnce(responseUserMock);

    await userService.update(id, updateUserMock);

    expect(prisma.user.update).toHaveBeenCalled();
  });

  it('Should return user mocked when invoque method update', async () => {
    const id = 1;
    const updateUserMock = updateUserDtoMock();
    const responseUserMock = responseUserDtoMock();

    prisma.user.update = jest.fn().mockReturnValueOnce(responseUserMock);

    const user = await userService.update(id, updateUserMock);

    expect(user).toEqual(responseUserMock);
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const id = 1;
    const updateUserMock = updateUserDtoMock();

    const error = new Error('Internal Server Error');
    prisma.user.update = jest.fn().mockRejectedValueOnce(error);

    const promise = userService.update(id, updateUserMock);

    await expect(promise).rejects.toThrow(new Error('Falha ao atualizar usuário'));
  });

  it('Should throw an error when the database has an error code P2002', async () => {
    const id = 1;
    const updateUserMock = updateUserDtoMock();

    const error = { code: 'P2002', message: 'duplicated key' };
    prisma.user.update = jest.fn().mockRejectedValueOnce(error);

    const promise = userService.update(id, updateUserMock);

    await expect(promise).rejects.toThrow(new Error('Email já registrado'));
  });

  it('Should throw an error when the database has an error code P2003', async () => {
    const id = 1;
    const updateUserMock = updateUserDtoMock();

    const error = { code: 'P2003', message: 'violated foreign key' };
    prisma.user.update = jest.fn().mockRejectedValueOnce(error);

    const promise = userService.update(id, updateUserMock);

    await expect(promise).rejects.toThrow(new Error('Role incorreta'));
  });

  it('Should throw an error when the database has an error code P2025', async () => {
    const id = 1;
    const updateUserMock = updateUserDtoMock();

    const error = { code: 'P2025', message: 'Record to update not found' };
    prisma.user.update = jest.fn().mockRejectedValueOnce(error);

    const promise = userService.update(id, updateUserMock);

    await expect(promise).rejects.toThrow(new Error('Usuário não encontrado'));
  });
});
