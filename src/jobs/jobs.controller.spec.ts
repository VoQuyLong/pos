import { Test, TestingModule } from '@nestjs/testing';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobController } from './jobs.controller';
import { JobsService } from './jobs.service';

const createJobDto: CreateJobDto = {
  name: 'New Job',
};

describe('JobController', () => {
  let jobsController: JobController;
  let jobsService: JobsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        JobsService,
        {
          provide: JobsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((job: CreateJobDto) =>
                Promise.resolve({ id: '1', ...job }),
              ),
            findOne: jest.fn().mockImplementation((fields) =>
              Promise.resolve({
                id: fields.id,
                name: 'Backend',
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: number, dto: UpdateJobDto) =>
                Promise.resolve({ id, ...dto }),
              ),
            softDelete: jest.fn(),
            findManyWithPagination: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'IT',
              },
              {
                id: 2,
                name: 'HR',
              },
            ]),
          },
        },
      ],
    }).compile();

    jobsController = app.get<JobController>(JobController);
    jobsService = app.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(jobsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a job', async () => {
      const result = await jobsController.create(createJobDto);
      expect(result).toEqual({ id: '1', ...createJobDto });
      expect(jobsService.create).toHaveBeenCalledWith(createJobDto);
    });
  });

  describe('findAll()', () => {
    it('should find all jobs', async () => {
      await jobsController.findAll(1, 20);
      expect(jobsService.findManyWithPagination).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a job', async () => {
      const result = await jobsController.findOne(1);
      expect(result).toEqual({ id: 1, name: 'Backend' });
      expect(jobsService.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a job', async () => {
      const updateJobDto = {
        name: 'Updated Job',
      };
      const result = await jobsController.update(1, updateJobDto);
      expect(result).toEqual({ id: 1, ...updateJobDto });
      expect(jobsService.update).toHaveBeenCalledWith(1, updateJobDto);
    });
  });

  describe('remove()', () => {
    it('should remove the job', async () => {
      await jobsController.remove(1);
      expect(jobsService.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
