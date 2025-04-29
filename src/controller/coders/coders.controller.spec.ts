import { Test, TestingModule } from '@nestjs/testing';
import { CodersController } from './coders.controller';

describe('CodersController', () => {
  let controller: CodersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodersController],
    }).compile();

    controller = module.get<CodersController>(CodersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
