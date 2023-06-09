import { CategoriaService } from './../../app/services/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

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
        console.log(res);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
