import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { IProduto } from "../../app/models/produto.model";
import { ProdutoService } from "../../app/services/produto.service";

@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html",
})
export class ProdutosPage {
  arrayProduto: Array<IProduto> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private produtoService: ProdutoService
  ) { }

  ionViewDidLoad() {
    const categoriaId = this.navParams.get("categoriaId");
    this.produtoService.findByCategoria(categoriaId).subscribe(
      (res) => {
        this.arrayProduto = res["content"];
      },
      (error) => {}
    );
  }
}
