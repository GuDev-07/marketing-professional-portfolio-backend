import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from '../projects.controller';
import { ProjectsService } from '../projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  type ProjectsServiceMock = {
    findAll: jest.Mock<Promise<any[]>, any[]>;
    findOne: jest.Mock<Promise<any> | null, any[]>;
  };

  const projectsServiceMock: ProjectsServiceMock = {
    findAll: jest.fn<Promise<any[]>, any[]>(),
    findOne: jest.fn<Promise<any> | null, any[]>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: projectsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return projects from service', async () => {
    projectsServiceMock.findAll.mockResolvedValue([
      { id: BigInt(1), title: 'Test' },
    ]);

    const result = await controller.findAll();

    expect(result).toHaveLength(1);
    expect(projectsServiceMock.findAll).toHaveBeenCalled();
  });
});
