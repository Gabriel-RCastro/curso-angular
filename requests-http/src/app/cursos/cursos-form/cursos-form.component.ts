import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  formulario: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     this.service.loadById(id).subscribe(curso => {
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.service.loadById(id))
    //   )
    //   .subscribe(curso => this.updateForm(curso));

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> casos de login

    const curso = this.route.snapshot.data['curso'];

    this.formulario = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  hasError(field: string) {
    return this.formulario.get(field).errors;
  }

  isValid(field: string) {
    return this.formulario.get(field).valid &&
      (this.formulario.get(field).touched || this.formulario.get(field).dirty);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formulario.valid) {
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente.'

      if (this.formulario.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente.'
      }

      this.service.save(this.formulario.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess),
            this.location.back()
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.formulario.reset();
  }

}
