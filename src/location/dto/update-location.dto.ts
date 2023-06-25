import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty()
  @IsOptional()
  local: string;

  @ApiProperty()
  @IsOptional()
  month: number;

  @ApiProperty()
  @IsOptional()
  year: number;
}
