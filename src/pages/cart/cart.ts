import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../app/services/cart.service';
import { ProdutoService } from '../../app/services/produto.service';
import { ICartItem } from '../../app/models/cart-item.model';

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

}
