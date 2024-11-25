import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/config/database/prisma.service';
import { createMock } from '@golevelup/ts-jest';

import { UserService } from '../../user.service';
import { UserRepository } from '../../user.repository';

export const createUnitTestingModule = async () => {
  const module = await Test.createTestingModule({
    providers: [
      UserService,
      UserRepository,
      {
        provide: PrismaService,
        useValue: createMock<PrismaService>(),
      },
    ],
  }).compile();

  return module;
};
