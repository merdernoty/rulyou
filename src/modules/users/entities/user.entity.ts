import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuidv4();

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
