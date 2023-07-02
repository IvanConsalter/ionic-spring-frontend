import { ICidade } from "./cidade.model";

export interface IEndereco {
  id: number;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: ICidade;
}
