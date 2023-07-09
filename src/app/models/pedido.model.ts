import { IItemPedido } from "./item-pedido.model";
import { IPagamento } from "./pagamento.model";
import { IRefereciaId } from "./referencia-id.model";

export interface IPedido {
  cliente: IRefereciaId;
  enderecoDeEntrega: IRefereciaId;
  pagamento: IPagamento;
  itens: Array<IItemPedido>;
}
