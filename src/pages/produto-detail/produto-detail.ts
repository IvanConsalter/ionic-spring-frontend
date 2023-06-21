import { ProdutoService } from './../../app/services/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProduto } from '../../app/models/produto.model';
import { Pages } from '../../app/shared/enum/pages.enum';
import { CartService } from '../../app/services/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  produto: IProduto;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private cartService: CartService,
    private produtoService: ProdutoService
  ) {
  }

  ionViewDidLoad() {
    const produtoId = this.navParams.get('produtoId');
    this.produtoService.findById(produtoId).subscribe(
      (res) => {
        this.produto = res;
      },
      (error) => {}
    )
  }

  addToCart(produto: IProduto) {
    this.cartService.addProduto(produto);
    this.navCtrl.push(Pages.CART);
  }

}
