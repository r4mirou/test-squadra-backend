import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { logMask, logText } from 'src/commons/utils/generic-functions.utils';

import { UserService } from '../user/user.service';

import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { PayloadTokenDto } from './dto/payload-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async login(data: AuthDto): Promise<AuthResponseDto> {
    this.logger.log('[login] starting login by credentials', logText(data));

    const fullUser = await this.userService.getUserContextByEmail(data.email);
    if (!fullUser) throw new NotFoundException('Usuário não encontrado');

    this.logger.log('[login] user found successfully', logMask(fullUser));

    const isValidPassword = await this.verifyPassword(data.password, fullUser.password);
    if (!isValidPassword) throw new UnauthorizedException('Não autorizado');

    this.logger.log('[login] user verified successfully', logText(isValidPassword));

    const { id: sub, roleName: role, permissions } = fullUser;
    const payload: PayloadTokenDto = { sub, role, permissions };

    this.logger.log('[login] payload created successfully', logText(payload));

    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    this.logger.log('[verifyPassword] starting verify password');

    const isMatch = await bcrypt.compare(password, hash);

    this.logger.log('[verifyPassword] password verified successfully', isMatch);

    return isMatch;
  }
}
