import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { GendersService } from './genders.service';
import { Repository } from 'typeorm';

const genderArray = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 2,
    name: 'Female',
  },
];

const oneGender = new Gender();
oneGender.id = 1;
oneGender.name = 'Male';

const gender = new Gender();
gender.name = 'Male';

describe('GenderService', () => {
  let service: GendersService;
  let repository: Repository<Gender>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GendersService,
        {
          provide: getRepositoryToken(Gender),
          useValue: {
            create: jest.fn().mockResolvedValue(gender),
            find: jest.fn().mockResolvedValue(genderArray),
            findOne: jest.fn().mockResolvedValue(oneGender),
            save: jest.fn().mockResolvedValue(oneGender),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GendersService>(GendersService);
    repository = module.get<Repository<Gender>>(getRepositoryToken(Gender));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a gender', () => {
      const oneGender = {
        id: 1,
        name: 'Male',
      };

      expect(
        service.create({
          name: 'Male',
        }),
      ).resolves.toEqual(oneGender);
    });
  });

  describe('findManyWithPagination()', () => {
    it('should return an array of genders', async () => {
      const repoSpy = jest.spyOn(repository, 'find');
      const genders = await service.findManyWithPagination({
        page: 1,
        limit: 20,
      });
      expect(genders).toEqual(genderArray);
      expect(repoSpy).toBeCalledWith({ skip: 0, take: 20 });
    });
  });

  describe('findOne()', () => {
    it('should get a single gender', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const result = await service.findOne({ id: 1 });
      expect(result).toEqual(oneGender);
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
