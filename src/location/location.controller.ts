import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationDto } from './dto/location.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { GetAlllocationsResponseDto } from './dto/get-all-location-response.dto';

@ApiTags('Location')
@Controller('locations')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}
    @Post()
    @ApiOperation({
        summary: 'Cria uma nova localização',
    })
    @ApiCreatedResponse({ type: LocationDto })
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
    @ApiOkResponse({ type: LocationDto })
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
    @ApiOkResponse({ type: LocationDto })
    @ApiNotFoundResponse({
        description: 'Localização não encontrada',
    })
    async getLocationById(@Param('locationId') locationId: string) {
        return await this.locationService.getLocationById(locationId);
    }

    @Get()
    @ApiOperation({
      summary: 'Retorna todas as localizações',
    })
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiOkResponse({ type: GetAlllocationsResponseDto })
    async getAllLocations(@Query('take') take = 10, @Query('skip') skip = 0) {
      return await this.locationService.getAllLocations(take, skip);
    }

    @Delete(':locationId')
    @ApiOperation({
        summary: 'Exclui uma localização',
    })
    @ApiOkResponse({ type: DeleteResponseDto })
    @ApiNotFoundResponse({
        description: 'Localização não encontrada',
    })
    async deleteLocation(@Param('locationId') locationId: string) {
        return {
            message: await this.locationService.deleteLocation(locationId),
        };
    }
}
