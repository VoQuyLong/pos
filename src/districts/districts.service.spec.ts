import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { DistrictsService } from './districts.service';
import { Repository } from 'typeorm';

const districtArray = [
  {
    id: 1,
    name: 'District 1',
  },
  {
    id: 2,
    name: 'District 2',
  },
];

const oneDistrict = new District();
oneDistrict.id = 1;
oneDistrict.name = 'District 1';

const newDistrict = new District();
newDistrict.id = 2;
newDistrict.name = 'New District';

describe('DistrictService', () => {
  let service: DistrictsService;
  let repository: Repository<District>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistrictsService,
        {
          provide: getRepositoryToken(District),
          useValue: {
            create: jest.fn().mockResolvedValue(newDistrict),
            find: jest.fn().mockResolvedValue(districtArray),
            findOne: jest.fn().mockResolvedValue(oneDistrict),
            save: jest.fn().mockResolvedValue(oneDistrict),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DistrictsService>(DistrictsService);
    repository = module.get<Repository<District>>(getRepositoryToken(District));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a district', () => {
      const oneDistrict = {
        id: 1,
        name: 'District 1',
      };

      expect(
        service.create({
          name: 'District 1',
        }),
      ).resolves.toEqual(oneDistrict);
    });
  });

  describe('findManyWithPagination()', () => {
    it('should return an array of districts', async () => {
      const repoSpy = jest.spyOn(repository, 'find');
      const districts = await service.findManyWithPagination({
        page: 1,
        limit: 20,
      });
      expect(districts).toEqual(districtArray);
      expect(repoSpy).toBeCalledWith({ skip: 0, take: 20 });
    });
  });

  describe('findOne()', () => {
    it('should get a single district', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const result = await service.findOne({ id: 1 });
      expect(result).toEqual(oneDistrict);
      expect(repoSpy).toBeCalledWith({ where: { id: 1 } });
    });
  });

  describe('softDelete()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'softDelete');
      const retVal = await service.softDelete(1);
      expect(removeSpy).toBeCalledWith(1);
      expect(retVal).toBeUndefined();
    });
  });
});
