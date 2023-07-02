import { StorageService } from './../../app/services/storage.service';
import { ClienteService } from './../../app/services/cliente.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEndereco } from '../../app/models/endereco.model';
import { IUser } from '../../app/models/user.model';
import { ILocalUser } from '../../app/models/local-user.model';
import { Pages } from '../../app/shared/enum/pages.enum';
import { IPedido } from '../../app/models/pedido.model';
import { CartService } from '../../app/services/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  arrayEnderecos: Array<IEndereco>;
  pedido: IPedido;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartService,
    private storageService: StorageService,
    private clienteService: ClienteService
  ) { }

  ionViewDidLoad() {
    const user: ILocalUser = this.storageService.getLocalUser();

    if(user && user.email) {
      this.carregarEnderecos(user);
    } else {
      this.navCtrl.setRoot(Pages.HOMEPAGE);
    }
  }

  carregarEnderecos(user: ILocalUser): void {
    this.clienteService.findByEmail(user.email).subscribe(
      (res) => {
        this.arrayEnderecos = res.enderecos;
        let cart = this.cartService.getCart();

        console.log(cart);

        this.pedido = {
          clienteId: res.id,
          enderecoDeEntregaId: null,
          pagamento: null,
          itens: cart.items.map( (item) => {
            return { quantidade: item.quantidade, produtoId: item.produto.id }
          })
        }
      },
      (error) => {
        if (error.status == 403) {
          this.navCtrl.setRoot(Pages.HOMEPAGE);
        }
      }
    );
  }

  nextPage(endereco: IEndereco) {
    this.pedido.enderecoDeEntregaId = endereco.id;
    console.log(this.pedido);
  }

}
