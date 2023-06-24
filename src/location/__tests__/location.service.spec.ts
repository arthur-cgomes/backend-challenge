import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../location.service';
import { MockRepository, repositoryMockFactory } from '../../utils/mock/test.util';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from '../entity/location.entity';
import { CreateLocationDto } from '../dto/create-location.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('LocationService', () => {
  let service: LocationService;
  let repositoryMock: MockRepository<Repository<Location>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(Location),
          useValue: repositoryMockFactory(),
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);

    repositoryMock = module.get(getRepositoryToken(Location));
  });

  beforeEach(() => jest.clearAllMocks());

  const location = {
    country: 'country',
    local: 'local',
    month: 8,
    year: 2024,
    url: 'url',
  } as Location;

  describe('createLocation', () => {
    const createLocationDto: CreateLocationDto = {
      country: 'country',
      local: 'local',
      month: 1,
      year: 2024,
      url: 'url',
    };

    it('Should successfully create a location', async () => {
      repositoryMock.findOne = jest.fn();
      repositoryMock.create = jest
        .fn()
        .mockReturnValue({ save: () => location });

      const result = await service.createLocation(createLocationDto);

      expect(result).toStrictEqual(location);
      expect(repositoryMock.create).toHaveBeenCalledWith({
        ...createLocationDto,
      });
    })

    it('Should throw a ConflictException if location already exists', async () => {
      const error = new ConflictException('Location already exists');

      repositoryMock.findOne = jest.fn().mockReturnValue(createLocationDto);

      await expect(
        service.createLocation(createLocationDto),
      ).rejects.toStrictEqual(error);
      expect(repositoryMock.create).not.toHaveBeenCalled();
    });

    it('Should throw a BadRequestException if date is in the past', async () => {
      const error = new BadRequestException(
        'Invalid date. Please provide a month in the future.',
      );

      repositoryMock.findOne = jest.fn();
      repositoryMock.create = jest.fn();

      await expect(
        service.createLocation({ ...createLocationDto, year: 2022 }),
      ).rejects.toStrictEqual(error);
      expect(repositoryMock.create).not.toHaveBeenCalled();
    });
  });


  //Final
});
