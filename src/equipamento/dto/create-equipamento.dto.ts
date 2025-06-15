import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateEquipamentoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  ca: string;

  @IsDateString()
  @IsNotEmpty()
  data_validade: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsNumber()
  @IsNotEmpty()
  qtd: number;
    
  @IsString()
  @IsNotEmpty()
  foto: string;
}
