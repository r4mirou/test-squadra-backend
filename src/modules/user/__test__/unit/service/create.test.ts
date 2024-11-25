import { PrismaService } from 'src/config/database/prisma.service';

import { createUnitTestingModule } from '../../_factory/create-user-test-module';
import createUserDtoMock from '../../_mocks/create-user.mock';
import responseUserDtoMock from '../../_mocks/response-user.mock';

import { UserService } from 'src/modules/user/user.service';

describe('create user unit tests (user.service.ts)', () => {
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

  it('Should call database once when invoque method create', async () => {
    const createUserMock = createUserDtoMock();
    const responseUserMock = responseUserDtoMock();

    prisma.user.create = jest.fn().mockReturnValueOnce(responseUserMock);
    userService.encryptPassword = jest
      .fn()
      .mockReturnValueOnce('1!2u4_ybgv1iugy.241i2u4gyi#ub124o$b124');

    await userService.create(createUserMock);

    expect(prisma.user.create).toHaveBeenCalled();
  });

  it('Should return user with id when invoque method create', async () => {
    const createUserMock = createUserDtoMock();
    const responseUserMock = responseUserDtoMock();

    prisma.user.create = jest.fn().mockReturnValueOnce(responseUserMock);
    userService.encryptPassword = jest
      .fn()
      .mockReturnValueOnce('1!2u4_ybgv1iugy.241i2u4gyi#ub124o$b124');

    const user = await userService.create(createUserMock);

    expect(user).toEqual(responseUserMock);
  });

  it('Should throw an error when the database has an unknown failure', async () => {
    const createUserMock = createUserDtoMock();

    const error = new Error('Internal Server Error');
    prisma.user.create = jest.fn().mockRejectedValueOnce(error);
    userService.encryptPassword = jest
      .fn()
      .mockReturnValueOnce('1!2u4_ybgv1iugy.241i2u4gyi#ub124o$b124');

    const promise = userService.create(createUserMock);

    await expect(promise).rejects.toThrow(new Error('Falha ao criar usuário'));
  });

  it('Should throw an error when the database has an error code P2002', async () => {
    const createUserMock = createUserDtoMock();

    const error = { code: 'P2002', message: 'duplicated key' };
    prisma.user.create = jest.fn().mockRejectedValueOnce(error);
    userService.encryptPassword = jest
      .fn()
      .mockReturnValueOnce('1!2u4_ybgv1iugy.241i2u4gyi#ub124o$b124');

    const promise = userService.create(createUserMock);

    await expect(promise).rejects.toThrow(new Error('Email já registrado'));
  });

  it('Should throw an error when the database has an error code P2002', async () => {
    const createUserMock = createUserDtoMock();

    const error = { code: 'P2003', message: 'violated foreign key' };
    prisma.user.create = jest.fn().mockRejectedValueOnce(error);
    userService.encryptPassword = jest
      .fn()
      .mockReturnValueOnce('1!2u4_ybgv1iugy.241i2u4gyi#ub124o$b124');

    const promise = userService.create(createUserMock);

    await expect(promise).rejects.toThrow(new Error('Role incorreta'));
  });
});
