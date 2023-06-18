import { EstadoService } from './../../app/services/estado.service';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertController,
  IonicPage,
  MenuController,
  NavController,
  NavParams,
} from "ionic-angular";
import { IEstado } from "../../app/models/estado.model";
import { ICidade } from "../../app/models/cidade.model";
import { ClienteService } from '../../app/services/cliente.service';
import { Pages } from '../../app/shared/enum/pages.enum';

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  signupForm: FormGroup;

  arrayEstado: Array<IEstado> = [];
  arrayCidade: Array<ICidade> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    private menuController: MenuController
  ) {
    this.signupForm = this.formBuilder.group({
      nome: [
        "Joaquim",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      email: ["joaquim@gmail.com", [Validators.required, Validators.email]],
      tipo: ["1", [Validators.required]],
      cpfOuCnpj: [
        "06134596280",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      senha: ["123", [Validators.required]],
      logradouro: ["Rua Via", [Validators.required]],
      numero: ["25", [Validators.required]],
      complemento: ["Apto 3", []],
      bairro: ["Copacabana", []],
      cep: ["10828333", [Validators.required]],
      telefone1: ["977261827", [Validators.required]],
      telefone2: ["", []],
      telefone3: ["", []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
    });
  }

  ionViewWillEnter() {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.carregarArrayEstado();

  }

  signupUser() {
    this.clienteService.insert(this.signupForm.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(Pages.LOGINPAGE);
          }
        }
      ]
    });
    alert.present();
  }

  carregarArrayEstado(): void {
    this.estadoService.findAll().subscribe(
      (res) => {
        console.log(res);

        this.arrayEstado = res;
        this.carregarArrayCidade(this.arrayEstado[0].id);
      },
      (error) => {}
    )
  }

  carregarArrayCidade(estadoId: number): void {
    this.estadoService.findCidadeByEstado(estadoId).subscribe(
      (res) => {
        console.log(res);

        this.arrayCidade = res;
      },
      (error) => {}
    )
  }

  updateCidades(estadoId: any): void {
    this.carregarArrayCidade(estadoId);
  }
}
