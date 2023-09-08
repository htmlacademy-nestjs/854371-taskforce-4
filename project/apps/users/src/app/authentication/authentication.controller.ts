import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import CreateUserDto from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import UserRdo from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationControllerMessages } from './authentication-controller-messages';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from '@project/shared/app-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from '@project/shared/authentication';
import { RequestWithPayload } from '../../../../../libs/shared/app-types/src/lib/user/request-with-payload';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationControllerMessages.USER_CREATED
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationControllerMessages.USER_LOGGED_IN
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationControllerMessages.WRONG_PASSWORD_OR_LOGIN
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user)
  }


  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  public async getUserById(@Req() { user }: RequestWithPayload) {
    const id = user.sub;
    const userExist = await this.authService.getUser(id);
    return fillObject(UserRdo, userExist);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }
}
