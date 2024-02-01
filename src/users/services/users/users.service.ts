import { Injectable } from '@nestjs/common';
import { mockDB } from '../../../mockDB.js';
import { CreateUserDto } from 'src/users/controllers/dtos/CreateUser.dto.js';
import { error } from 'console';
@Injectable()
export class UsersService {
  private mockDB: CreateUserDto[] = mockDB;
  fetchUsers(gender: string) {
    if (gender) {
      return this.mockDB.filter(
        (user) => user.gender.toLocaleLowerCase() == gender.toLocaleLowerCase(),
      );
    }
    return this.mockDB;
  }
  fetchUserById(guid: string): CreateUserDto[] | string {
    const user: CreateUserDto[] = this.mockDB.filter(
      (user) => user.guid == guid,
    );
    if (user.length === 0) return null;
    return user;
  }
  addUser(newUser: CreateUserDto) {
    try {
      this.mockDB.push(newUser);
    } catch (error) {
      throw error;
    }
  }
  deleteUserById(guid: string) {
    try {
      this.mockDB = this.mockDB.filter((user) => user.guid !== guid);
    } catch (error) {
      throw error;
    }
    return `User ${guid} was deleted succesfully.`;
  }
}
