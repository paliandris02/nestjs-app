import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(@Query('gender') gender: string) {
    return this.userService.fetchUsers(gender);
  }
  @Get(':guid')
  getUser(@Param('guid') guid: string) {
    const user = this.userService.fetchUserById(guid);
    if (!user)
      throw new HttpException(
        `User ${guid} was not found.`,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userPayload: CreateUserDto) {
    try {
      this.userService.addUser(userPayload);
    } catch (error) {
      throw new HttpException(
        'Something went wrong.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return `User ${userPayload} added succesfully.`;
  }
  @Delete(':guid')
  deleteUser(@Param('guid') guid: string) {
    try {
      this.userService.deleteUserById(guid);
    } catch (error) {
      throw new HttpException(
        'Something went wrong.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return `User ${guid} was deleted succesfully.`;
  }
}
