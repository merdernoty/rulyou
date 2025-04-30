import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, MinLength, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Полное имя пользователя',
    example: 'Иван Иванов',
    minLength: 2,
  })
  @IsNotEmpty({ message: 'Полное имя не может быть пустым' })
  @IsString({ message: 'Полное имя должно быть строкой' })
  @MinLength(2, { message: 'Полное имя должно содержать минимум 2 символа' })
  full_name: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'developer',
  })
  @MinLength(2, { message: 'Роль должна содержать минимум 2 символа' })
  @IsNotEmpty({ message: 'Роль не может быть пустой' })
  @IsString({ message: 'Роль должна быть строкой' })
  role: string;

  @ApiProperty({
    description: 'Эффективность пользователя',
    example: 85,
  })
  @Min(0, { message: 'Эффективность должна быть больше или равна 0' })
  @IsNotEmpty({ message: 'Эффективность не может быть пустой' })
  @IsInt({ message: 'Эффективность должна быть целым числом' })
  efficiency: number;
}
