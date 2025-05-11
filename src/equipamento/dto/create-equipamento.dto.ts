import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateEquipamentoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsOptional()
  ca?: string;

  @IsDateString()
  @IsOptional()
  dataValidade?: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;
}
