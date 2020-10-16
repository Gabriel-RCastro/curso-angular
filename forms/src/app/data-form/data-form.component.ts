import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { FormValidations } from '../shared/form-validations';
import { EstadoBr } from '../shared/models/iestado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  // estados: EstadoBr[];
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworks: any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) { }

  ngOnInit(): void {

    //this.verificaEmailService.verificarEmail('email@email.com').subscribe();

    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();
    this.frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

    /* this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
    }); */

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      // Exemplo para limitar caracteres do nome: [Validators.minLength(3), Validators.maxLength(20)]]
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [Validators.required, FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [false, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

    /* return this.formBuilder.array( [
      new FormControl(false), //angular
      new FormControl(false), //react
      new FormControl(false), //vue
      new FormControl(false)  //sencha
    ]); */
  }

  onSubmit() {
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v !== null)
    });

    console.log(valueSubmit);

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe(dados => {
          console.log(dados);
          //reseta o formulário
          this.resetarFormulario();
        },
          (erro: any) => alert('erro'));
    } else {
      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesFormulario(controle);
      }
    })
  }

  aplicaCssErro(campo: string) {
    if (this.formulario.get(campo).valid) {
      return {
        'is-valid': this.formulario.get(campo).valid &&
          (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
      }
    } else {
      return {
        'is-invalid': !this.formulario.get(campo).valid &&
          (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
      }
    }
  }

  resetarFormulario() {
    this.formulario.reset({ newsletter: 's', termos: false });
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosFormulario(dados));;
    }
  }

  populaDadosFormulario(dados) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'php']);
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

}
