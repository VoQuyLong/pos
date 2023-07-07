import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TelecomProvider } from './entities/telecom.entity';
import { TelecomsService } from './telecoms.service';
import { DeepPartial, Repository } from 'typeorm';
import { CreateTelecomProviderDto } from './dto/create-telecom.dto';
import { UpdateTelecomProviderDto } from './dto/update-telecom.dto';

const telecomArray = [
  {
    id: 1,
    name: 'TelecomProvider 1',
  },
  {
    id: 2,
    name: 'TelecomProvider 2',
  },
];

const sampleTelecomProvider = new TelecomProvider();
sampleTelecomProvider.id = 1;
sampleTelecomProvider.name = 'TelecomProvider';

describe('TelecomProviderService', () => {
  let service: TelecomsService;
  let repository: Repository<TelecomProvider>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelecomsService,
        {
          provide: getRepositoryToken(TelecomProvider),
          useValue: {
            create: jest
              .fn()
              .mockImplementationOnce((dto: CreateTelecomProviderDto) =>
                Promise.resolve(dto),
              )
              .mockImplementationOnce(
                (id: number, payload: DeepPartial<TelecomProvider>) =>
                  Promise.resolve({ id, ...payload }),
              ),
            find: jest.fn().mockResolvedValue(telecomArray),
            findOne: jest.fn().mockResolvedValue(sampleTelecomProvider),
            save: jest
              .fn()
              .mockImplementation((telecomProvider: TelecomProvider) =>
                Promise.resolve(
                  telecomProvider.id == undefined
                    ? { id: 1, ...telecomProvider }
                    : telecomProvider,
                ),
              ),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TelecomsService>(TelecomsService);
    repository = module.get<Repository<TelecomProvider>>(
      getRepositoryToken(TelecomProvider),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a newTelecomProvider', () => {
      const newTelecomProviderDto = new CreateTelecomProviderDto();
      newTelecomProviderDto.name = 'TelecomProvider';

      const newTelecomProvider = new TelecomProvider();
      newTelecomProvider.id = 1;
      newTelecomProvider.name = newTelecomProviderDto.name;

      expect(service.create(newTelecomProviderDto)).resolves.toEqual({
        id: newTelecomProvider.id,
        name: newTelecomProvider.name,
      });
    });
  });

  describe('Update()', () => {
    it('should successfully update an exist TelecomProvider', () => {
      const id = 1;
      const updateTelecomProviderDto = new UpdateTelecomProviderDto();
      updateTelecomProviderDto.name = 'Updated TelecomProvider';

      const updatedTelecomProvider = new TelecomProvider();
      updatedTelecomProvider.id = id;
      updatedTelecomProvider.name = updateTelecomProviderDto.name;

      expect(service.update(id, updateTelecomProviderDto)).resolves.toEqual(
        updatedTelecomProvider,
      );
    });
  });

  describe('findManyWithPagination()', () => {
    it('should return an array of telecoms', async () => {
      const repoSpy = jest.spyOn(repository, 'find');
      const telecoms = await service.findManyWithPagination({
        page: 1,
        limit: 20,
      });
      expect(telecoms).toEqual(telecomArray);
      expect(repoSpy).toBeCalledWith({ skip: 0, take: 20 });
    });
  });

  describe('findOne()', () => {
    it('should get a single newTelecomProvider', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const result = await service.findOne({ id: 1 });
      expect(result).toEqual(sampleTelecomProvider);
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
