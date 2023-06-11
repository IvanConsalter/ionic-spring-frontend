import { AuthService } from './../../app/services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { User } from '../../app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private authService: AuthService,
    private menuController: MenuController,
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  ionViewWillEnter() {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menuController.swipeEnable(true);
  }

  login() {
    this.user = { ...this.userForm.value };
    this.authService.authenticate(this.user).subscribe(
      (res) => {
        console.log(res.headers.get('Authorization'));

        this.navCtrl.setRoot('HomePage');
      },
      (error) => {});
  }

}
