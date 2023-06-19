import { CategoriaService } from './../../app/services/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ICategoria } from '../../app/models/categoria.model';
import { Pages } from '../../app/shared/enum/pages.enum';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  arrayCategoria: Array<ICategoria> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoriaService: CategoriaService
  )
  { }

  ionViewDidLoad() {
    this.findAll();
  }

  findAll(): void {
    this.categoriaService.findAll().subscribe(
      (res) => {
        this.arrayCategoria = res;
      },
      (error) => {});
  }

  showProdutos() {
    this.navCtrl.push(Pages.PRODUTOS);
  }

}
