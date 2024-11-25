import { PrismaService } from 'src/config/database/prisma.service';

import { createUnitTestingModule } from '../../_factory/create-user-test-module';
import { fullUserQueryResultDataMock } from '../../_mocks/full-user.mock';

import { UserService } from 'src/modules/user/user.service';

describe('get user context unit tests (user.service.ts)', () => {
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

  it('Should call database once when invoque method getUserContextByEmail', async () => {
    const email = 'user@email.com';
    const fullUserQueryResultMock = fullUserQueryResultDataMock();

    prisma.user.findUnique = jest.fn().mockReturnValueOnce(fullUserQueryResultMock);

    await userService.getUserContextByEmail(email);

    expect(prisma.user.findUnique).toHaveBeenCalled();
  });

  it('Should return user mocked when invoque method getUserContextByEmail', async () => {
    const email = 'user@email.com';
    const fullUserQueryResultMock = fullUserQueryResultDataMock();

    const { role, ...userWithoutRole } = fullUserQueryResultMock;
    const fullUserMock = {
      ...userWithoutRole,
      roleName: role.name,
      permissions: role.rolePermissions.map((rp) => rp.permission.name),
    };

    prisma.user.findUnique = jest.fn().mockReturnValueOnce(fullUserQueryResultMock);

    const fullUser = await userService.getUserContextByEmail(email);

    expect(fullUser).toEqual(fullUserMock);
  });

  it('Should return null when method getUserContextByEmail not found user', async () => {
    const email = 'user@email.com';
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);

    const user = await userService.getUserContextByEmail(email);

    expect(user).toEqual(null);
  });
});
