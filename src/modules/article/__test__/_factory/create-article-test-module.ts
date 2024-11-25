import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/config/database/prisma.service';
import { createMock } from '@golevelup/ts-jest';

import { ArticleService } from '../../article.service';
import { ArticleRepository } from '../../article.repository';

export const createUnitTestingModule = async () => {
  const module = await Test.createTestingModule({
    providers: [
      ArticleService,
      ArticleRepository,
      {
        provide: PrismaService,
        useValue: createMock<PrismaService>(),
      },
    ],
  }).compile();

  return module;
};
