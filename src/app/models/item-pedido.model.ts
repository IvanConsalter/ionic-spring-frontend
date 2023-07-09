import { IRefereciaId } from "./referencia-id.model";

export interface IItemPedido {
  quantidade: number;
  produto: IRefereciaId;
}
