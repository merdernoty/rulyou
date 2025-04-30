import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async findAll(role?: string): Promise<User[]> {
    return this.usersRepository.getAllUsers(role);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersRepository.updateUser(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersRepository.deleteUser(id);
  }

  async removeAll(): Promise<void> {
    return this.usersRepository.deleteAllUsers();
  }
}
