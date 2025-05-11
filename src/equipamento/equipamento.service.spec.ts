import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentoService } from './equipamento.service';

describe('EquipamentoService', () => {
  let service: EquipamentoService;

  const mockEquipamentoRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipamentoService,
        {
          provide: 'EQUIPAMENTO_REPOSITORY',
          useValue: mockEquipamentoRepo,
        },
      ],
    }).compile();

    service = module.get<EquipamentoService>(EquipamentoService);
  });

  afterEach(() => jest.clearAllMocks());

  it('Deve cadastrar um novo equipamento de proteção', async () => {
    const dto = { nome: 'Capacete' };
    const createdEquipamento = { id: 1, nome: 'Capacete' };

    mockEquipamentoRepo.create.mockReturnValue(createdEquipamento);
    mockEquipamentoRepo.save.mockResolvedValue(createdEquipamento);

    const result = await service.create(dto as any);
    expect(result).toEqual(createdEquipamento);
    expect(mockEquipamentoRepo.create).toHaveBeenCalledWith(dto);
    expect(mockEquipamentoRepo.save).toHaveBeenCalledWith(createdEquipamento);
  });

  it('Deve encontrar um equipamento pelo código', async () => {
    const equipamento = { codigo: 123 };
    mockEquipamentoRepo.findOne.mockResolvedValue(equipamento);

    const result = await service.findOneByCod(123);
    expect(result).toEqual(equipamento);
    expect(mockEquipamentoRepo.findOne).toHaveBeenCalledWith({
      where: { codigo: 123 },
    });
  });
});
