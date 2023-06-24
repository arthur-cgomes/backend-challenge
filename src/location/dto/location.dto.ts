import { OmitType } from '@nestjs/swagger';
import { Location } from '../entity/location.entity';

export class LocationDto extends OmitType(Location, []) {}