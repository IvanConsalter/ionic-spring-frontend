import { Component } from "@angular/core";
import { IonicPage, LoadingController, NavController, NavParams } from "ionic-angular";
import { IProduto } from "../../app/models/produto.model";
import { ProdutoService } from "../../app/services/produto.service";
import { Pages } from "../../app/shared/enum/pages.enum";

@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html",
})
export class ProdutosPage {
  arrayProduto: Array<IProduto> = [];

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private produtoService: ProdutoService,
  ) { }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    const categoriaId = this.navParams.get("categoriaId");
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoriaId).subscribe(
      (res) => {
        this.arrayProduto = res["content"];
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
    );
  }

  showDetail(produtoId: number) {
    this.navCtrl.push(Pages.PRODUTO_DETAIL, { produtoId: produtoId });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
