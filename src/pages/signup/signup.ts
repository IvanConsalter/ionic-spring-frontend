import { Component } from "@angular/core";
import {
  IonicPage,
  MenuController,
  NavController,
  NavParams,
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuController: MenuController
  ) {}

  ionViewWillEnter() {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  signupUser() {
    console.log("enviou o form");
  }

  updateCidades() {}
}
