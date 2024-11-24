import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { logMask, logText } from 'src/commons/utils/generic-functions.utils';

import { UserRepository } from './user.repository';

import { UserDto } from './dto/user.dto';
import { FullUserDto } from './dto/full-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  private readonly logger = new Logger(UserService.name);
  private readonly saltRounds = process.env.PASS_SALT_ROUNDS;

  async create(data: CreateUserDto): Promise<ResponseUserDto> {
    this.logger.log('[create] starting user creation', logMask(data));

    try {
      const hashedPassword = await this.encryptPassword(data.password);
      const userWithHashedPassword = { ...data, password: hashedPassword };

      const createdUser = await this.repository.create(userWithHashedPassword);
      const sanitizedUser = this.sanitizeUser(createdUser);

      this.logger.log('[create] user created successfully', logMask(createdUser));

      return sanitizedUser;
    } catch (error) {
      this.logger.error('[create] failed to create user', logText(error));

      //refatorar erros prisma
      if (error?.code === 'P2002') throw new ConflictException('Email já registrado');
      if (error?.code === 'P2003') throw new ConflictException('Role incorreta');

      throw new InternalServerErrorException('Falha ao criar usuário');
    }
  }

  async getAll(): Promise<ResponseUserDto[]> {
    this.logger.log('[getAll] starting users research');

    let sanitizedUsers: UserDto[];

    try {
      const users = await this.repository.getAll();
      sanitizedUsers = users.map((user) => this.sanitizeUser(user));
    } catch (error) {
      this.logger.error('[getAll] users research failure', logText(error));
      throw new InternalServerErrorException('Falha ao buscar usuários');
    }

    if (!sanitizedUsers || sanitizedUsers.length === 0) {
      this.logger.warn('[getAll] users not found');
      throw new NotFoundException('Nenhum usuário encontrado');
    }

    this.logger.log('[getAll] users found ', logText(sanitizedUsers));
    return sanitizedUsers;
  }

  async get(userId: number): Promise<ResponseUserDto> {
    this.logger.log('[get] starting user research', logText({ userId }));

    let sanitizedUser: UserDto;

    try {
      const user = await this.repository.get(userId);
      sanitizedUser = this.sanitizeUser(user);
    } catch (error) {
      this.logger.error('[get] user research failure', logText(error));
      throw new InternalServerErrorException('Falha ao buscar usuário');
    }

    if (!sanitizedUser) {
      this.logger.warn('[get] user not found');
      throw new NotFoundException('Usuário não encontrado');
    }

    this.logger.log('[get] user found ', logText(sanitizedUser));
    return sanitizedUser;
  }

  async update(userId: number, data: UpdateUserDto): Promise<ResponseUserDto> {
    this.logger.log('[update] starting update user', logText({ userId }), logText(data));

    try {
      const updatedUser = await this.repository.update(userId, data);
      const sanitizedUser = this.sanitizeUser(updatedUser);

      this.logger.log('[update] user updated successfully', logText(sanitizedUser));

      return sanitizedUser;
    } catch (error) {
      this.logger.error('[update] user update failure', logText(error));

      //refatorar erros prisma
      if (error?.code === 'P2002') throw new ConflictException('Email já registrado');
      if (error?.code === 'P2003') throw new ConflictException('Role incorreta');

      throw new InternalServerErrorException('Falha ao atualizar usuário');
    }
  }

  async delete(userId: number): Promise<ResponseUserDto> {
    this.logger.log('[delete] starting delete user', logText({ userId }));

    let sanitizedUser: UserDto;

    try {
      const deletedUser = await this.repository.delete(userId);
      sanitizedUser = this.sanitizeUser(deletedUser);
    } catch (error) {
      this.logger.error('[delete] user delete failure', logText(error));
      throw new InternalServerErrorException('Falha ao deletar usuário');
    }

    if (!sanitizedUser) {
      this.logger.warn('[get] not found user');
      throw new NotFoundException('Usuário não encontrado');
    }

    this.logger.log('[get] user deleted successfully', logText(sanitizedUser));
    return sanitizedUser;
  }

  async getUserContextByEmail(email: string): Promise<FullUserDto> {
    this.logger.log('[getUserContextByEmail] starting user research by email', logText({ email }));

    const fullUserContext = await this.repository.getUserContextByEmail(email);

    this.logger.log('[getUserContextByEmail] user found ', logMask(fullUserContext));

    return fullUserContext || null;
  }

  private sanitizeUser(user: UserDto & { password: string }): UserDto {
    const { password, ...sanitizedUser } = user;
    void password;

    this.logger.log('[sanitizeUser] user updated successfully ', logMask(sanitizedUser));

    return sanitizedUser;
  }

  async encryptPassword(password: string): Promise<string> {
    this.logger.log('[encryptPassword] starting encrypt password');

    try {
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);
      this.logger.log('[encryptPassword] password encrypted successfully');

      return hashedPassword;
    } catch (error) {
      this.logger.log('[encryptPassword] password encrypt failure', logText(error));
      throw new InternalServerErrorException('Falha ao criptografar senha');
    }
  }
}
