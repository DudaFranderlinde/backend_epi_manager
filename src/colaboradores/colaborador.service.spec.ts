import { Test, TestingModule } from '@nestjs/testing';
import { ColaboradorService } from './colaborador.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('ColaboradorService', () => {
  let service: ColaboradorService;

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockColaboradorRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColaboradorService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: 'COLABORADOR_REPOSITORY', useValue: mockColaboradorRepo },
      ],
    }).compile();

    service = module.get<ColaboradorService>(ColaboradorService);
  });

  afterEach(() => jest.clearAllMocks());

  it('Deve retornar colaborador pelo CPF', async () => {
    const colaborador = { cpf: '12345678900', nome: 'Fulano' };
    mockColaboradorRepo.findOne.mockResolvedValue(colaborador);

    const result = await service.findColaborador('12345678900');
    expect(result).toEqual(colaborador);
    expect(mockColaboradorRepo.findOne).toHaveBeenCalledWith({
      where: { cpf: '12345678900' },
    });
  });
  
  it('Deve criar colaborador com senha criptografada', async () => {
    const dto = { nome: 'Fulano', cpf: '12345678900', senha: 'senha123' };

    mockColaboradorRepo.findOne.mockResolvedValue(null);
    mockColaboradorRepo.create.mockImplementation((data) => ({ ...data }));
    mockColaboradorRepo.save.mockImplementation((data) => Promise.resolve({ ...data }));

    const result = await service.create(dto as any);

    expect(result).not.toHaveProperty('senha');
    expect(result).not.toHaveProperty('salt');

    expect(mockColaboradorRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        nome: 'Fulano',
        cpf: '12345678900',
    }));

    expect(mockColaboradorRepo.save).toHaveBeenCalledWith(expect.objectContaining({
        senha: expect.any(String),
        salt: expect.any(String),
    }));
    });

  it('Deve rejeitar criação se CPF já estiver cadastrado', async () => {
    const dto = { nome: 'Fulano', cpf: '12345678900', senha: 'senha123' };
    mockColaboradorRepo.findOne.mockResolvedValue({ id: 1, cpf: dto.cpf });

    await expect(service.create(dto as any)).rejects.toEqual('Já existe um registro com esse CPF');
  });

  it('Deve lançar NotFoundException se não encontrar por matrícula', async () => {
    mockColaboradorRepo.findOne.mockResolvedValue(null);

    await expect(service.findByMatricula('999')).rejects.toThrowError(
      new NotFoundException('Colaborador não encontrado'),
    );
  });

  it('Deve retornar colaborador encontrado por matrícula', async () => {
    const colaborador = { id: 1, matricula: '123', nome: 'Fulano', senha: 'hashed', permissao: 'ADMIN' };
    mockColaboradorRepo.findOne.mockResolvedValue(colaborador);

    const result = await service.findByMatricula('123');
    expect(result).toEqual(colaborador);
    expect(mockColaboradorRepo.findOne).toHaveBeenCalledWith({
      where: { matricula: '123' },
      select: ['id', 'matricula', 'nome', 'senha', 'permissao'],
    });
  });
});
