import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css']//,
  // inputs: ['nomeCurso:nome]
})
export class InputPropertyComponent implements OnInit {

  @Input('nome') nomeCurso: string = "";

  constructor() { }

  ngOnInit() {
  }

}
