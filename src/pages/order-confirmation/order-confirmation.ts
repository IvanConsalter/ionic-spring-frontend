import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IPedido } from '../../app/models/pedido.model';
import { ICartItem } from '../../app/models/cart-item.model';
import { ICliente } from '../../app/models/cliente.model';
import { IEndereco } from '../../app/models/endereco.model';
import { CartService } from '../../app/services/cart.service';
import { ClienteService } from '../../app/services/cliente.service';
import { Pages } from '../../app/shared/enum/pages.enum';
import { PedidoService } from '../../app/services/pedido.service';

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
  codigoPedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartService,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
  ) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.findCliente();
  }

  findCliente(): void {
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(res => {
        this.cliente = res;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, res['enderecos']);
      },
      error => {
        this.navCtrl.setRoot(Pages.HOMEPAGE);
      });
  }

  total() : number {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot(Pages.CART);
  }

  home() {
    this.navCtrl.setRoot(Pages.HOMEPAGE);
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe((res) => {
        this.cartService.createOrClearCart();
        this.codigoPedido = this.extractId(res.headers.get('location'));
        console.log(this.codigoPedido);

      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot(Pages.HOMEPAGE);
        }
      });
  }

  private findEndereco(enderecoId: number, arrayEndereco: Array<IEndereco>): IEndereco {
    let position = arrayEndereco.findIndex(endereco => endereco.id == enderecoId);
    return arrayEndereco[position];
  }

  private extractId(location : string): string {
    return location.split('/').pop();
  }

}
