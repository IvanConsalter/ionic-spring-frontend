import { IEstado } from "./estado.model";

export interface ICidade {
  id: number;
  nome: string;
  estado: IEstado;
}
