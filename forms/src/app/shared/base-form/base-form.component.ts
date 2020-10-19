import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<br>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesFormulario(controle);
      }
    })
  }

  resetarFormulario() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: string) {
    if (this.formulario.get(campo).valid && this.formulario.get(campo).value != null) {
      return 'is-valid';
    } else if (!this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)) {
      return 'is-invalid';
    }
  }

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }
}
