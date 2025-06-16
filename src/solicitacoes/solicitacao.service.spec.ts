import { Test, TestingModule } from '@nestjs/testing';
import { SolicitacaoService } from './solicitacoes.service';
import { EquipamentoService } from 'src/equipamento/equipamento.service';
import { ColaboradorService } from 'src/colaboradores/colaborador.service';

describe('SolicitacaoService', () => {
  let service: SolicitacaoService;

  const mockSolicitacaoRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockEquipamentoService = {
    findOneByCod: jest.fn().mockResolvedValue({ id: 1, name: 'Equipamento 1' }),
  };

  const mockColaboradorService = {
    findColaboradorById: jest.fn().mockResolvedValue({ id: 1, name: 'Colaborador 1' }),
    findByMatricula: jest.fn().mockResolvedValue({ matricula: '123', name: 'Colaborador 1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolicitacaoService,
        { provide: 'SOLICITACAO_REPOSITORY', useValue: mockSolicitacaoRepo },
        { provide: EquipamentoService, useValue: mockEquipamentoService },
        { provide: ColaboradorService, useValue: mockColaboradorService },
      ],
      imports: [],
    }).compile();

    service = module.get<SolicitacaoService>(SolicitacaoService);
  });

    afterEach(() => jest.clearAllMocks());

    it('Deve criar uma nova solicitação', async () => {
    const dto = {
        equipamentoId: 1,
        urgencia: 'alta',
        qtd: 2,
        matricula_responsavel: '123',
    };

    const equipamento = { id: 1 };
    const solicitante = { id: 2 };
    const responsavel = { id: 3 };
    const novaSolicitacao = {};
    const solicitacaoCriada = { id: 99 };

    mockEquipamentoService.findOneByCod.mockResolvedValue(equipamento);
    mockColaboradorService.findColaboradorById.mockResolvedValue(solicitante);
    mockColaboradorService.findByMatricula.mockResolvedValue(responsavel);
    mockSolicitacaoRepo.create.mockReturnValue(novaSolicitacao);
    mockSolicitacaoRepo.save.mockResolvedValue(solicitacaoCriada);

    const result = await service.create(dto as any, 2);
    expect(result).toEqual(solicitacaoCriada);

    expect(mockSolicitacaoRepo.create).toHaveBeenCalled(); 

    expect(mockSolicitacaoRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
        equipamento,
        solicitante,
        responsavel_epi: responsavel,
        qtd: dto.qtd,
        urgencia: dto.urgencia,
        dataAbertura: expect.any(Date),
        }),
    );
    });

    it('Deve lançar erro se o equipamento não for encontrado', async () => {
        mockEquipamentoService.findOneByCod.mockResolvedValue(null);

    await expect(service.create({ equipamentoId: 1 } as any, 2)).rejects.toEqual(
        expect.objectContaining({
            code: undefined,
            detail: undefined,
        }),
    );

    });

    it('Deve lançar erro se o solicitante não for encontrado', async () => {
        const dto = { equipamentoId: 1, urgencia: 'alta', qtd: 2, matricula_responsavel: '123' };
        const equipamento = { id: 1, name: 'Equipamento 1' };
        const responsavel = { id: 3, name: 'Colaborador 2' };

        mockEquipamentoService.findOneByCod.mockResolvedValue(equipamento);
        mockColaboradorService.findColaboradorById.mockResolvedValue(null);
        mockColaboradorService.findByMatricula.mockResolvedValue(responsavel);

        await expect(service.create(dto as any, 2)).rejects.toEqual(
            expect.objectContaining({
            code: undefined,
            detail: undefined,
            }),
        );
    });

    it('Deve lançar erro se o responsável não for encontrado', async () => {
        const dto = { equipamentoId: 1, urgencia: 'alta', qtd: 2, matricula_responsavel: '123' };
        const equipamento = { id: 1, name: 'Equipamento 1' };
        const solicitante = { id: 2, name: 'Colaborador 1' };

        mockEquipamentoService.findOneByCod.mockResolvedValue(equipamento);
        mockColaboradorService.findColaboradorById.mockResolvedValue(solicitante);
        mockColaboradorService.findByMatricula.mockResolvedValue(null);

        await expect(service.create(dto as any, 2)).rejects.toEqual(
            expect.objectContaining({
            code: undefined,
            detail: undefined,
            }),
        );
    });

    it('Deve retornar erro ao falhar ao salvar no banco', async () => {
        const dto = { equipamentoId: 1, urgencia: 'alta', qtd: 2, matricula_responsavel: '123' };
        const equipamento = { id: 1, name: 'Equipamento 1' };
        const solicitante = { id: 2, name: 'Colaborador 1' };
        const responsavel = { id: 3, name: 'Colaborador 2' };

        const novaSolicitacao = { id: 99 };
        mockEquipamentoService.findOneByCod.mockResolvedValue(equipamento);
        mockColaboradorService.findColaboradorById.mockResolvedValue(solicitante);
        mockColaboradorService.findByMatricula.mockResolvedValue(responsavel);
        mockSolicitacaoRepo.create.mockReturnValue(novaSolicitacao);
        mockSolicitacaoRepo.save.mockRejectedValue(new Error('Erro ao salvar no banco'));

        await expect(service.create(dto as any, 2)).rejects.toEqual(
            expect.objectContaining({
                code: undefined,
                detail: undefined,
            }),
        );
    });

});
