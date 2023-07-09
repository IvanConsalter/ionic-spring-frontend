import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IPedido } from '../../app/models/pedido.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pages } from '../../app/shared/enum/pages.enum';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: IPedido;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  paymentForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.pedido = this.navParams.get('pedido');
    this.configurarPaymentForm();
  }

  ionViewDidLoad() {
  }

  configurarPaymentForm(): void {
    this.paymentForm = this.formBuilder.group({
      numeroDeParcelas: [1, [Validators.required]],
      "@type": ["pagamentoComCartao", [Validators.required]]
    });
  }

  nextPage() {
    this.pedido.pagamento = this.paymentForm.value;
    this.navCtrl.setRoot(Pages.ORDERCONFIRMATIONPAGE, { pedido: this.pedido });
  }

}
