import { ProdutoService } from './../../app/services/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProduto } from '../../app/models/produto.model';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  produto: IProduto;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
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

}
