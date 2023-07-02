import { AuthService } from './services/auth.service';
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IPage } from './models/page.model';
import { Pages } from './shared/enum/pages.enum';

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "LoginPage";

  pages: Array<IPage>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    private authService: AuthService,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: Pages.HOMEPAGE },
      { title: "Categorias", component: Pages.CATEGORIAS },
      { title: 'Profile', component: Pages.PROFILE },
      { title: 'Carrinho', component: Pages.CART },
      { title: "Logout", component: "" },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: IPage) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch(page.title) {
      case 'Logout':
        this.authService.logout();
        this.nav.setRoot('LoginPage');
        break;

      default:
        this.nav.setRoot(page.component);

    }
  }

}
