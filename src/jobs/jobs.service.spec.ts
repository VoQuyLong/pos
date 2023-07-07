import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobsService } from './jobs.service';
import { Repository, DeepPartial } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';

const jobArray = [
  {
    id: 1,
    name: 'IT',
  },
  {
    id: 2,
    name: 'HR',
  },
];

const sampleJob = new Job();
sampleJob.id = 1;
sampleJob.name = 'Job';

const newJob = new Job();
newJob.id = 1;
newJob.name = 'Job';

describe('JobService', () => {
  let service: JobsService;
  let repository: Repository<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getRepositoryToken(Job),
          useValue: {
            // create: jest
            //   .fn()
            //   .mockImplementationOnce((dto: CreateJobDto) =>
            //     Promise.resolve(dto),
            //   )
            //   .mockImplementationOnce((id: number, payload: DeepPartial<Job>) =>
            //     Promise.resolve({ id, ...payload }),
            //   ),
            create: jest.fn().mockResolvedValue(newJob),
            find: jest.fn().mockResolvedValue(jobArray),
            findOne: jest.fn().mockResolvedValue(sampleJob),
            // save: jest
            //   .fn()
            //   .mockImplementation((job: Job) =>
            //     Promise.resolve(job.id == undefined ? { id: 1, ...job } : job),
            //   ),
            save: jest.fn().mockResolvedValue(sampleJob),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    repository = module.get<Repository<Job>>(getRepositoryToken(Job));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a job', () => {
      const repoSpy = jest.spyOn(repository, 'create');
      const newJobDto = new CreateJobDto();
      newJobDto.name = 'Job';

      const newJob = new Job();
      newJob.id = 1;
      newJob.name = newJobDto.name;

      expect(service.create(newJobDto)).resolves.toEqual({
        id: newJob.id,
        name: newJob.name,
      });
      expect(repoSpy).toBeCalledWith(newJobDto);
    });
  });

  describe('update()', () => {
    it('should successfully update a job', async () => {
      const id = 1;
      const payload: DeepPartial<Job> = {
        name: 'Job',
      };

      const updatedJob = new Job();
      updatedJob.id = id;
      updatedJob.name = payload.name;

      const repoSpy = jest.spyOn(repository, 'create');
      expect(service.update(id, payload)).resolves.toEqual(updatedJob);
      expect(repoSpy).toBeCalledWith({ id, ...payload });
    });
  });

  describe('findManyWithPagination()', () => {
    it('should return an array of jobs', async () => {
      const repoSpy = jest.spyOn(repository, 'find');
      const jobs = await service.findManyWithPagination({
        page: 1,
        limit: 20,
      });
      expect(jobs).toEqual(jobArray);
      expect(repoSpy).toBeCalledWith({ skip: 0, take: 20 });
    });
  });

  describe('findOne()', () => {
    it('should get a single job', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const result = await service.findOne({ id: 1 });
      expect(result).toEqual(sampleJob);
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
