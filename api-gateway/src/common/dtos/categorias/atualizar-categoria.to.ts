import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

interface IEvento {
  nome: string;
  operacao: string;
  valor: number;
}

class AtualizarCategoriaDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<IEvento>;
}

export { AtualizarCategoriaDto };
