import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from './location.dto';

export class GetAlllocationsResponseDto {
  @ApiProperty()
  take: number;

  @ApiProperty()
  skip: number;

  @ApiProperty({ type: LocationDto, isArray: true })
  locations: LocationDto[];
}
