import { Test, TestingModule } from '@nestjs/testing';
import { PuestoService } from './puesto.service';

describe('PuestoService', () => {
  let service: PuestoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuestoService],
    }).compile();

    service = module.get<PuestoService>(PuestoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
