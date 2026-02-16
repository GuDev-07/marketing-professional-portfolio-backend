import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksController } from '../feedbacks.controller';
import { FeedbacksService } from '../feedbacks.service';

describe('FeedbacksController', () => {
  let controller: FeedbacksController;

  type FeedbacksServiceMock = {
    getHello: jest.Mock<string, []>;
  };

  const feedbacksServiceMock: FeedbacksServiceMock = {
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbacksController],
      providers: [
        {
          provide: FeedbacksService,
          useValue: feedbacksServiceMock,
        },
      ],
    }).compile();

    controller = module.get<FeedbacksController>(FeedbacksController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return hello from service', () => {
    feedbacksServiceMock.getHello.mockReturnValue('Feedbacks service');

    const result = controller.getHello();

    expect(result).toBe('Feedbacks service');
    expect(feedbacksServiceMock.getHello).toHaveBeenCalled();
  });
});
