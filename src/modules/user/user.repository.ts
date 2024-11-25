import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/config/database/prisma.service';
import BaseRepository from 'src/commons/base-classes/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<User, PrismaClient['user']> {
  constructor(database: PrismaService) {
    super(database.user);
  }

  async getAll() {
    const row = await this.model.findMany();
    return row;
  }

  async getUserContextByEmail(email: string) {
    const row = await this.model.findUnique({
      where: { email },
      include: {
        role: {
          select: {
            name: true,
            rolePermissions: {
              select: {
                permission: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!row) return null;

    const { role, ...userWithoutRole } = row;
    return {
      ...userWithoutRole,
      roleName: role.name,
      permissions: role.rolePermissions.map((rp) => rp.permission.name),
    };
  }
}
