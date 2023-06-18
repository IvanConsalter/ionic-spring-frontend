import { EstadoService } from './../../app/services/estado.service';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  IonicPage,
  MenuController,
  NavController,
  NavParams,
} from "ionic-angular";
import { IEstado } from "../../app/models/estado.model";
import { ICidade } from "../../app/models/cidade.model";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  SignupForm: FormGroup;

  arrayEstado: Array<IEstado> = [];
  arrayCidade: Array<ICidade> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    private menuController: MenuController
  ) {
    this.SignupForm = this.formBuilder.group({
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
    console.log("enviou o form");
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
