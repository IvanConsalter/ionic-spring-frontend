import { AuthService } from './../../app/services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { User } from '../../app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pages } from '../../app/shared/enum/pages.enum';

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

  ionViewDidEnter() {
    this.authService.refreshToken().subscribe(
      (res) => {
        this.authService.sucessLogin(res.headers.get('Authorization'));
        this.navCtrl.setRoot(Pages.HOMEPAGE);
      },
      (error) => {});
  }

  login() {
    this.user = { ...this.userForm.value };
    this.authService.authenticate(this.user).subscribe(
      (res) => {
        this.authService.sucessLogin(res.headers.get('Authorization'));
        this.navCtrl.setRoot(Pages.HOMEPAGE);
      },
      (error) => {});
  }

  signup() {
    this.navCtrl.push(Pages.SIGNUP);
  }

}
