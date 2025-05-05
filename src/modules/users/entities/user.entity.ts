import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsInt, IsNotEmpty, IsUUID } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  role: string;

  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsInt()
  efficiency: number;
}
