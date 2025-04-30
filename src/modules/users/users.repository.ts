import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    return this.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  async getAllUsers(role?: string): Promise<User[]> {
    return role ? this.find({ where: { role } }) : this.find();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.update(id, updateUserDto);
    return this.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.findOne({ where: { id } });
    if (user) {
      await this.remove(user);
    }
    return user;
  }

  async deleteAllUsers(): Promise<void> {
    await this.clear();
  }
}
