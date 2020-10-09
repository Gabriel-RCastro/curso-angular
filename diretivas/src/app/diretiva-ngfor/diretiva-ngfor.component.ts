import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngfor',
  templateUrl: './diretiva-ngfor.component.html',
  styleUrls: ['./diretiva-ngfor.component.scss']
})
export class DiretivaNgforComponent implements OnInit {

  cursos: string[] = ['Angular 2', 'Java', 'Phonegap'];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.cursos.length; i++) {
      const curso = this.cursos[i];
    }
  }

}
