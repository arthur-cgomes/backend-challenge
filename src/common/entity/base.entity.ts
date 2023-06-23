import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseCollection extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty({ type: Date })
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: string;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({
    type: 'timestamp',
    select: false,
  })
  updatedAt: string;
}