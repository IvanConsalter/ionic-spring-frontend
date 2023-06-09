import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    private menuController: MenuController
  ) { }

  ionViewWillEnter() {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menuController.swipeEnable(true);
  }

  login() {
    this.navCtrl.setRoot('HomePage');
  }

}
