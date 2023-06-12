import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageService } from "../../app/services/storage.service";
import { ICliente } from "../../app/models/cliente.model";
import { ClienteService } from "../../app/services/cliente.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {

  cliente: ICliente;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    private clienteService: ClienteService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
        },
        error => {});
    }
  }

}
