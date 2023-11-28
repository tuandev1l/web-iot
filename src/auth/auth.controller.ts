import {
  Controller,
  HttpCode,
  Post,
  Patch,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dtos/auth-credentials';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() authCredentials: AuthCredentials,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signup(authCredentials, res);
  }

  @Post('/login')
  async login(
    @Body() authCredentials: AuthCredentials,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(authCredentials, res);
  }

  @Patch('/updatePassword')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    const { currentPassword, password, passwordConfirm } = updatePasswordDto;

    if (!currentPassword || !password || !passwordConfirm)
      throw new BadRequestException(
        'Please provide us password, passwordConfirm'
      );

    if (password !== passwordConfirm) {
      throw new BadRequestException(
        'Password and passwordConfirm must be equals'
      );
    }
  }
}
