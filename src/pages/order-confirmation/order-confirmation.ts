import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IPedido } from '../../app/models/pedido.model';
import { ICartItem } from '../../app/models/cart-item.model';
import { ICliente } from '../../app/models/cliente.model';
import { IEndereco } from '../../app/models/endereco.model';
import { CartService } from '../../app/services/cart.service';
import { ClienteService } from '../../app/services/cliente.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: IPedido;
  arrayCartItems: Array<ICartItem> = [];
  cliente: ICliente;
  endereco: IEndereco;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartService,
    private clienteService: ClienteService,
  ) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.findCliente();
  }

  findCliente(): void {
    this.clienteService.findById(this.pedido.clienteId)
      .subscribe(res => {
        this.cliente = res;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntregaId, res['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }
  private findEndereco(enderecoId: number, arrayEndereco: Array<IEndereco>): IEndereco {
    let position = arrayEndereco.findIndex(endereco => endereco.id == enderecoId);
    return arrayEndereco[position];
  }

  total() : number {
    return this.cartService.total();
  }

}
