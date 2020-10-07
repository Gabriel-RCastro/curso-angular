import { Input, OnInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { DoCheck } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnChanges, OnInit, DoCheck, AfterContentInit,
AfterContentChecked, AfterViewChecked, OnDestroy {

  @Input() valorInicial: number = 10;

  constructor() {
    this.log("constructor");
  }

  ngOnInit() {
    this.log("ngOnIninit");
  }

  ngOnChanges() {
    this.log("ngOnChanges");
  }

  ngDoCheck() {
    this.log("ngDoCheck");
  }

  ngAfterContentChecked() {
    this.log("ngAfterContentChecked");
  }

  ngAfterContentInit() {
    this.log("ngAfterContentInit");
  }

  ngAfterViewChecked() {
    this.log("ngAfterViewChecked");
  }

  ngOnDestroy() {
    this.log("ngOnDestroy");
  }

  private log(hook: string) {
    console.log(hook);
  }
}
