import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsService } from '../projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  type PrismaMock = {
    project: {
      findMany: jest.Mock<Promise<any[]>, any[]>;
      findUnique: jest.Mock<Promise<any> | null, any[]>;
    };
  };

  const prismaMock: PrismaMock = {
    project: {
      findMany: jest.fn() as jest.Mock<Promise<any[]>, any[]>,
      findUnique: jest.fn() as jest.Mock<Promise<any> | null, any[]>,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return projects', async () => {
    prismaMock.project.findMany.mockResolvedValue([
      { id: BigInt(1), title: 'Test' },
    ]);

    const result = await service.findAll();

    expect(result).toHaveLength(1);
  });
});
