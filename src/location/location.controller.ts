import { Body, Controller, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';

@ApiTags('Location')
@Controller('locations')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post()
    @ApiOperation({
        summary: 'Cria uma nova localização',
    })
    //@ApiCreatedResponse({ type: LocationDto })
    @ApiConflictResponse({
        description: 'Local já existe',
    })
    @ApiBadRequestResponse({
        description: 'Data inválida',
    })
    async createLocation(@Body() createLocationDto: CreateLocationDto) {
        return await this.locationService.createLocation(createLocationDto);
    }
}
