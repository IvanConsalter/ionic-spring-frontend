import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from './services/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ClienteService } from './services/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { EstadoService } from './services/estado.service';
import { ComponentsModule } from '../components/components.module';
import { ProdutoService } from './services/produto.service';
import { CartService } from './services/cart.service';
import { PedidoService } from './services/pedido.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CartService,
    EstadoService,
    StorageService,
    ClienteService,
    ProdutoService,
    CategoriaService,
    PedidoService,

    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
