import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import CreateUserDto from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import UserRdo from './rdo/user.rdo';
import LoginUserDto from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {
  }

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const loggedUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRdo, loggedUser)
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    const user = await this.authService.getUser(id);
    return fillObject(UserRdo, user)
  }
}
