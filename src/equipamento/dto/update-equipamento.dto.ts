import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEquipamentoDto {
  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsOptional()
  preco?: number;
}
