import {
    Injectable,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entity/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>,
    ) {}

    public async createLocation(
        createLocationDto: CreateLocationDto,
    ): Promise<Location> {
        const checkLocation = await this.locationRepository.findOne({
            where: {
                country: createLocationDto.country,
                local: createLocationDto.local,
            }
        });

        if (checkLocation) {
            throw new ConflictException('Location already exists');
        }

        const currentDate = new Date();

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const userYear = createLocationDto.year;
        const userMonth = createLocationDto.month;

        if (
            userYear < currentYear ||
            (userYear == currentYear && userMonth < currentMonth)
        ) {
            throw new BadRequestException(
                'Invalid date. Please provide a month in the future.',
            );
        }

        return await this.locationRepository
            .create({ ...createLocationDto })
            .save();
    }
}
