import { StorageService } from './../../app/services/storage.service';
import { ClienteService } from './../../app/services/cliente.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEndereco } from '../../app/models/endereco.model';
import { IUser } from '../../app/models/user.model';
import { ILocalUser } from '../../app/models/local-user.model';
import { Pages } from '../../app/shared/enum/pages.enum';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  arrayEnderecos: Array<IEndereco>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
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
        this.arrayEnderecos = res.enderecos
      },
      (error) => {
        if (error.status == 403) {
          this.navCtrl.setRoot(Pages.HOMEPAGE);
        }
      }
    );
  }

}
