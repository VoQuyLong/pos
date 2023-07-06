import { Test, TestingModule } from '@nestjs/testing';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { GenderController } from './genders.controller';
import { GendersService } from './genders.service';

const createGenderDto: CreateGenderDto = {
  name: 'LGBT',
};

describe('GenderController', () => {
  let gendersController: GenderController;
  let gendersService: GendersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GenderController],
      providers: [
        GendersService,
        {
          provide: GendersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((gender: CreateGenderDto) =>
                Promise.resolve({ id: '1', ...gender }),
              ),
            findOne: jest.fn().mockImplementation((fields) =>
              Promise.resolve({
                id: fields.id,
                name: 'Male',
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: number, dto: UpdateGenderDto) =>
                Promise.resolve({ id, ...dto }),
              ),
            softDelete: jest.fn(),
            findManyWithPagination: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Male',
              },
              {
                id: 2,
                name: 'Female',
              },
            ]),
          },
        },
      ],
    }).compile();

    gendersController = app.get<GenderController>(GenderController);
    gendersService = app.get<GendersService>(GendersService);
  });

  it('should be defined', () => {
    expect(gendersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a gender', async () => {
      const result = await gendersController.create(createGenderDto);
      expect(result).toEqual({ id: '1', ...createGenderDto });
      expect(gendersService.create).toHaveBeenCalledWith(createGenderDto);
    });
  });

  describe('findAll()', () => {
    it('should find all genders', async () => {
      await gendersController.findAll(1, 20);
      expect(gendersService.findManyWithPagination).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a gender', async () => {
      const result = await gendersController.findOne(1);
      expect(result).toEqual({ id: 1, name: 'Male' });
      expect(gendersService.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a gender', async () => {
      const updateGenderDto = {
        name: 'Female',
      };
      const result = await gendersController.update(1, updateGenderDto);
      expect(result).toEqual({ id: 1, ...updateGenderDto });
      expect(gendersService.update).toHaveBeenCalledWith(1, updateGenderDto);
    });
  });

  describe('remove()', () => {
    it('should remove the gender', async () => {
      await gendersController.remove(1);
      expect(gendersService.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
