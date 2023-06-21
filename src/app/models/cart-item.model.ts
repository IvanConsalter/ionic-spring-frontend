import { IProduto } from "./produto.model";

export interface ICartItem {
  quantidade: number,
  produto: IProduto
}
