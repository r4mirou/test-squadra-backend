import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ParseIntPipe,
  Logger,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ValidateFieldsPipe } from 'src/commons/pipes/validate-fields.pipe';
import { logMask, logText } from 'src/commons/utils/generic-functions.utils';

import { AuthGuard } from 'src/commons/guards/auth/auth.guard';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UsePipes(ValidateFieldsPipe)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @Post()
  @ApiCreatedResponse({ type: ResponseUserDto })
  async create(@Body() data: CreateUserDto) {
    this.logger.log('[create] starting user creation', logMask(data));

    const createdUser = await this.userService.create(data);

    this.logger.log('[create] user created successfully', logText(createdUser));

    return createdUser;
  }

  @Get('')
  @ApiCreatedResponse({ type: ResponseUserDto })
  async getAll() {
    this.logger.log('[getAll] starting users research');

    const users = await this.userService.getAll();

    this.logger.log('[getAll] users found ', logText(users));

    return users;
  }

  @Get('/:userId')
  @ApiCreatedResponse({ type: ResponseUserDto })
  async get(@Param('userId', ParseIntPipe) userId: number) {
    this.logger.log('[get] starting user research', logText({ userId }));

    const user = await this.userService.get(userId);

    this.logger.log('[get] user found: ', logText(user));

    return user;
  }

  @Patch('/:userId')
  @ApiCreatedResponse({ type: ResponseUserDto })
  async update(@Body() data: UpdateUserDto, @Param('userId', ParseIntPipe) userId: number) {
    this.logger.log('[update] starting update user', logText({ userId }), logText(data));

    const updateduser = await this.userService.update(userId, data);

    this.logger.log('[update] user updated successfully', logText(updateduser));

    return updateduser;
  }

  @Delete('/:userId')
  @ApiCreatedResponse({ type: ResponseUserDto })
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    this.logger.log('[delete] starting delete user', logText({ userId }));

    const deletedUser = await this.userService.delete(userId);

    this.logger.log('[delete] user deleted successfully', logText({ deletedUser }));

    return deletedUser;
  }
}
