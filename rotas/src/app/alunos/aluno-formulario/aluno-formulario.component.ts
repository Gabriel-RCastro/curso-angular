import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/iform-deactivate';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-formulario',
  templateUrl: './aluno-formulario.component.html',
  styleUrls: ['./aluno-formulario.component.css']
})
export class AlunoFormularioComponent implements OnInit, IFormCanDeactivate {

  aluno: any = {};
  inscricao: Subscription;
  private formularioMudou: boolean = false;

  constructor(  
    private route: ActivatedRoute,
    private alunosService: AlunosService
  ) { } 

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);

        if (this.aluno == null) {
          this.aluno = {};
        }
      }
    );
  }

  onInput() {
    this.formularioMudou = true;
  }

  podeMudarRota() {
    if (this.formularioMudou) {
      return confirm('Tem certeza que deseja sair dessa página');
    }
    return true;
  }

  podeDesativar() {
    return this.podeMudarRota();
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
