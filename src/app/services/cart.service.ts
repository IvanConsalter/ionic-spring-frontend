import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ICart } from '../models/cart.model';
import { IProduto } from '../models/produto.model';

@Injectable()
export class CartService {

  constructor(public storageService: StorageService) {
  }

  createOrClearCart(): ICart {
      let cart: ICart = {items: []};
      this.storageService.setCart(cart);
      return cart;
  }

  getCart(): ICart {
      let cart: ICart = this.storageService.getCart();
      if (cart == null) {
          cart = this.createOrClearCart();
      }
      return cart;
  }

  addProduto(produto: IProduto): ICart {
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.produto.id == produto.id);
      if (position == -1) {
          cart.items.push({quantidade: 1, produto: produto});
      }
      this.storageService.setCart(cart);
      return cart;
  }

  removeProduto(produto: IProduto): ICart {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
        cart.items.splice(position, 1);
    }
    this.storageService.setCart(cart);
    return cart;
}

increaseQuantity(produto: IProduto): ICart {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
        cart.items[position].quantidade++;
    }
    this.storageService.setCart(cart);
    return cart;
}

decreaseQuantity(produto: IProduto): ICart {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
        cart.items[position].quantidade--;
        if (cart.items[position].quantidade < 1) {
            cart = this.removeProduto(produto);
        }
    }
    this.storageService.setCart(cart);
    return cart;
}

total() : number {
    let cart = this.getCart();
    let sum = 0;
    for (var i=0; i<cart.items.length; i++) {
        sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
    return sum;
}
}
