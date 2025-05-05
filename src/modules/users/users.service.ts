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

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const userData = {
      id: user.id,
      full_name: user.full_name,
      role: user.role,
      efficiency: user.efficiency,
    };
    await this.usersRepository.deleteUser(id);
    return userData
  }

  async removeAll(): Promise<void> {
    return this.usersRepository.deleteAllUsers();
  }
}
