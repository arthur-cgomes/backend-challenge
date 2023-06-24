import {
    Injectable,
    ConflictException,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entity/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

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

    public async updateLocation(
        locationId,
        updateLocationDto: UpdateLocationDto,
    ): Promise<Location> {
        const location = await this.locationRepository.findOne({
            where: { id: locationId },
        });

        if (!location) {
            throw new NotFoundException('Location not found');
        }

        const currentDate = new Date();

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const userYear = updateLocationDto.year;
        const userMonth = updateLocationDto.month;

        if (
            userYear < currentYear ||
            (userYear == currentYear && userMonth < currentMonth)
        ) {
            throw new BadRequestException(
                'Invalid date. Please provide a month in the future.',
            );
        }

        return await (
            await this.locationRepository.preload({
                id: locationId,
                ...updateLocationDto,
            })
        ).save();
    }

    public async getLocationById(locationId: string): Promise<Location> {
        const location = await this.locationRepository.findOne({
            where: { id: locationId },
        });

        if (!location) {
            throw new NotFoundException('Location not found');
        }

        return location;
    }

    public async deleteLocation(locationId: string): Promise<string> {
        const deleteLocation = await this.locationRepository.findOne({
            where: { id: locationId },
        });

        if (!deleteLocation) {
            throw new NotFoundException('Location not found');
        }

        await this.locationRepository.remove(deleteLocation);
        return 'Location deleted';
    }
}
