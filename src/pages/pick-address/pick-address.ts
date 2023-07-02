import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEndereco } from '../../app/models/endereco.model';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  arrayEnderecos: Array<IEndereco>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.arrayEnderecos = [
      {
        id: 1,
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Mônica",
        cep: "48293822",
        cidade: {
          id: 1,
          nome: "Uberlândia",
          estado: {
            id: 1,
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: 2,
        logradouro: "Rua Alexandre Toledo da Silva",
        numero: "405",
        complemento: null,
        bairro: "Centro",
        cep: "88933822",
        cidade: {
          id: 3,
          nome: "São Paulo",
          estado: {
            id: 2,
            nome: "São Paulo"
          }
        }
      }
    ];

  }

}
