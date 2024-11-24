import { Controller, Post, Body, UsePipes, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ValidateFieldsPipe } from 'src/commons/pipes/validate-fields.pipe';
import { logMask, logText } from 'src/commons/utils/generic-functions.utils';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@UsePipes(ValidateFieldsPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('login')
  @ApiCreatedResponse({ type: AuthResponseDto })
  async login(@Body() data: AuthDto) {
    this.logger.log('[create] starting login', logMask(data));

    const accessToken = await this.authService.login(data);

    this.logger.log('[create] login successfully', logText(accessToken));

    return accessToken;
  }
}
