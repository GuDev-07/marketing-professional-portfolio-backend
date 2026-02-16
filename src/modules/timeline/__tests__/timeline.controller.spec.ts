import { Test, TestingModule } from '@nestjs/testing';
import { TimelineController } from '../timeline.controller';
import { TimelineService } from '../timeline.service';

describe('TimelineController', () => {
  let controller: TimelineController;

  type TimelineServiceMock = {
    getHello: jest.Mock<string, []>;
  };

  const timelineServiceMock: TimelineServiceMock = {
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimelineController],
      providers: [
        {
          provide: TimelineService,
          useValue: timelineServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TimelineController>(TimelineController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return hello from service', () => {
    timelineServiceMock.getHello.mockReturnValue('Timeline service');

    const result = controller.getHello();

    expect(result).toBe('Timeline service');
    expect(timelineServiceMock.getHello).toHaveBeenCalled();
  });
});
