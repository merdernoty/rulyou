import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@ApiTags('users')
@Controller()
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 400, description: 'Ошибка при создании пользователя' })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { id: user.id };
  }

  @Get('/get')
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiQuery({
    name: 'role',
    required: false,
    description: 'Фильтр по роли пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей',
  })
  async findAll(@Query('role') role?: string) {
    const users = await this.usersService.findAll(role);
    return { users };
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @ApiParam({
    name: 'id',
    description: 'Уникальный идентификатор пользователя',
  })
  @ApiResponse({ status: 200, description: 'Данные пользователя' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { users: [user] };
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Обновление данных пользователя' })
  @ApiParam({
    name: 'id',
    description: 'Уникальный идентификатор пользователя',
  })
  @ApiResponse({ status: 200, description: 'Пользователь успешно обновлен' })
  @ApiResponse({
    status: 400,
    description: 'Ошибка при обновлении пользователя',
  })
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return user;
  }

  @Delete('/delete')
  @ApiOperation({ summary: 'Удаление всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Все пользователи успешно удалены',
    schema: {
      example: { success: true },
    },
  })
  async removeAll() {
    await this.usersService.removeAll();
    return {};
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление пользователя по ID' })
  @ApiParam({
    name: 'id',
    description: 'Уникальный идентификатор пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return user;
  }
}
