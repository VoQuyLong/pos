import { Test, TestingModule } from '@nestjs/testing';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { DistrictController } from './districts.controller';
import { DistrictsService } from './districts.service';

const createDistrictDto: CreateDistrictDto = {
  name: 'New District',
};

describe('DistrictController', () => {
  let districtsController: DistrictController;
  let districtsService: DistrictsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DistrictController],
      providers: [
        DistrictsService,
        {
          provide: DistrictsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((district: CreateDistrictDto) =>
                Promise.resolve({ id: '1', ...district }),
              ),
            findOne: jest.fn().mockImplementation((fields) =>
              Promise.resolve({
                id: fields.id,
                name: 'District 1',
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: number, dto: UpdateDistrictDto) =>
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

    districtsController = app.get<DistrictController>(DistrictController);
    districtsService = app.get<DistrictsService>(DistrictsService);
  });

  it('should be defined', () => {
    expect(districtsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a district', async () => {
      const result = await districtsController.create(createDistrictDto);
      expect(result).toEqual({ id: '1', ...createDistrictDto });
      expect(districtsService.create).toHaveBeenCalledWith(createDistrictDto);
    });
  });

  describe('findAll()', () => {
    it('should find all districts', async () => {
      await districtsController.findAll(1, 20);
      expect(districtsService.findManyWithPagination).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a district', async () => {
      const result = await districtsController.findOne(1);
      expect(result).toEqual({ id: 1, name: 'District 1' });
      expect(districtsService.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a district', async () => {
      const updateDistrictDto = {
        name: 'Updated District',
      };
      const result = await districtsController.update(1, updateDistrictDto);
      expect(result).toEqual({ id: 1, ...updateDistrictDto });
      expect(districtsService.update).toHaveBeenCalledWith(
        1,
        updateDistrictDto,
      );
    });
  });

  describe('remove()', () => {
    it('should remove the district', async () => {
      await districtsController.remove(1);
      expect(districtsService.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
