import { IItemPedido } from "./item-pedido.model";
import { IPagamento } from "./pagamento.model";

export interface IPedido {
  clienteId: number;
  enderecoDeEntregaId: number;
  pagamento: IPagamento;
  itens: Array<IItemPedido>;
}
