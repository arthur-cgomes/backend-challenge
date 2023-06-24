import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('Location')
@Controller('locations')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

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

    @Put(':locationId')
    @ApiOperation({
        summary: 'Atualiza a meta e a localização',
    })
    //@ApiOkResponse({ type: LocationDto })
    @ApiNotFoundResponse({
        description: 'Localização não encontrada',
    })
    async updateLocation(
        @Param('locationId') locationId: string,
        @Body() updateLocationDto: UpdateLocationDto,
    ) {
        return await this.locationService.updateLocation(
            locationId,
            updateLocationDto,
        );
    }
    
    @Get(':locationId')
    @ApiOperation({
      summary: 'Retorna uma localização pelo Id',
    })
    //@ApiOkResponse({ type: LocationDto })
    @ApiNotFoundResponse({
      description: 'Localização não encontrada',
    })
    async getLocationById(@Param('locationId') locationId: string) {
      return await this.locationService.getLocationById(locationId);
    }
}
