import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import CreateUserDto from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import UserRdo from './rdo/user.rdo';
import LoginUserDto from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationControllerMessages } from './authentication-controller-messages';

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
  public async login(@Body() dto: LoginUserDto) {
    const loggedUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRdo, loggedUser);
  }


  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    const user = await this.authService.getUser(id);
    return fillObject(UserRdo, user);
  }
}
