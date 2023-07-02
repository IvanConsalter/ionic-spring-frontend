import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../app/services/cart.service';
import { ProdutoService } from '../../app/services/produto.service';
import { ICartItem } from '../../app/models/cart-item.model';
import { IProduto } from '../../app/models/produto.model';
import { Pages } from '../../app/shared/enum/pages.enum';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  arrayCartItems: Array<ICartItem> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.arrayCartItems = cart.items;
  }

  removeItem(produto: IProduto) {
    this.arrayCartItems = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: IProduto) {
    this.arrayCartItems = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: IProduto) {
    this.arrayCartItems = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot(Pages.CATEGORIAS);
  }

  checkout() {
    this.navCtrl.push(Pages.PICKADDRESS);
  }

}
