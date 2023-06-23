import { ApiProperty } from '@nestjs/swagger';
import { BaseCollection } from '../../common/entity/base.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Location extends BaseCollection {
  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 35 })
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 35 })
  local: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column()
  month: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 255 })
  url: string;
}