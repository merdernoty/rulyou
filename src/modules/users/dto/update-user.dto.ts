import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Полное имя пользователя',
    example: 'Петр Петров',
  })
  @IsOptional()
  @IsString({ message: 'Полное имя должно быть строкой' })
  @MinLength(2, { message: 'Полное имя должно содержать минимум 2 символа' })
  @MaxLength(100,{ message: 'Полное имя должно содержать максимум 100 символов' } )
  full_name?: string;

  @ApiPropertyOptional({
    description: 'Роль пользователя',
    example: 'manager',
  })
  @IsOptional()
  @MinLength(2, { message: 'Роль должна содержать минимум 2 символа' })
  @MaxLength(100,{ message: 'Роль должна содержать максимум 100 символов' } )
  @IsString({ message: 'Роль должна быть строкой' })
  role?: string;

  @ApiPropertyOptional({
    description: 'Эффективность пользователя',
    example: 90,
  })
  @Min(0, { message: 'Эффективность должна быть больше или равна 0' })
  @IsOptional()
  @IsInt({ message: 'Эффективность должна быть целым числом' })
  efficiency?: number;
}
