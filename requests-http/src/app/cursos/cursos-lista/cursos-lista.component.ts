import { Component, OnInit } from '@angular/core';

import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Curso } from '../models/icurso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // bsModalRef: BsModalRef;

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private alertService: AlertModalService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados);

    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.log(error);
          // this.error$.next(true);
          this.handleError();
          return EMPTY;
        })
      );

    /* this.service.list()
      .pipe(catchError(error => EMPTY))
      .subscribe(dados => {
        console.log(dados);
      }); */
  }

  handleError() {
    /* this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos, tente novamente mais tarde.'; */

    this.alertService.showAlertDanger('Erro ao carregar cursos, tente novamente mais tarde.');
  }
}
