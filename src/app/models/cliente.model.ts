import { IEndereco } from "./endereco.model"

export interface ICliente {
  id: number;
  nome: string;
  email: string;
  cpfOuCnpj: string;
  tipo: number;
  perfis: Array<string>;
  enderecos: Array<IEndereco>;
  telefones: Array<string>;
}
