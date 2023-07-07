import { Test, TestingModule } from '@nestjs/testing';
import { CreateTelecomProviderDto } from './dto/create-telecom.dto';
import { UpdateTelecomProviderDto } from './dto/update-telecom.dto';
import { TelecomController } from './telecoms.controller';
import { TelecomsService } from './telecoms.service';

const createTelecomProviderDto: CreateTelecomProviderDto = {
  name: 'New TelecomProvider',
};

describe('TelecomController', () => {
  let telecomsController: TelecomController;
  let telecomsService: TelecomsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TelecomController],
      providers: [
        TelecomsService,
        {
          provide: TelecomsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((telecom: CreateTelecomProviderDto) =>
                Promise.resolve({ id: 1, ...telecom }),
              ),
            findOne: jest.fn().mockImplementation((fields) =>
              Promise.resolve({
                id: fields.id,
                name: `TelecomProvider ${fields.id}`,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: number, dto: UpdateTelecomProviderDto) =>
                Promise.resolve({ id, ...dto }),
              ),
            softDelete: jest.fn(),
            findManyWithPagination: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'District 1',
              },
              {
                id: 2,
                name: 'District 2',
              },
            ]),
          },
        },
      ],
    }).compile();

    telecomsController = app.get<TelecomController>(TelecomController);
    telecomsService = app.get<TelecomsService>(TelecomsService);
  });

  it('should be defined', () => {
    expect(telecomsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a telecom', async () => {
      const result = await telecomsController.create(createTelecomProviderDto);
      expect(result).toEqual({ id: 1, ...createTelecomProviderDto });
      expect(telecomsService.create).toHaveBeenCalledWith(
        createTelecomProviderDto,
      );
    });
  });

  describe('findAll()', () => {
    it('should find all telecoms', async () => {
      await telecomsController.findAll(1, 20);
      expect(telecomsService.findManyWithPagination).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a telecom', async () => {
      const result = await telecomsController.findOne(1);
      expect(result).toEqual({ id: 1, name: 'TelecomProvider 1' });
      expect(telecomsService.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a telecom', async () => {
      const updateTelecomProviderDto: UpdateTelecomProviderDto = {
        name: 'Updated District',
      };
      const result = await telecomsController.update(
        1,
        updateTelecomProviderDto,
      );
      expect(result).toEqual({ id: 1, ...updateTelecomProviderDto });
      expect(telecomsService.update).toHaveBeenCalledWith(
        1,
        updateTelecomProviderDto,
      );
    });
  });

  describe('remove()', () => {
    it('should remove the telecom', async () => {
      await telecomsController.remove(1);
      expect(telecomsService.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
