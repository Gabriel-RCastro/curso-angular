
import { Component } from '@angular/core';
import { literal } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'meu-primeiro-component',
    template: `
        <p>Meu primeiro component com Angular 2!</p>
    `
})
export class MeuPrimeiroComponent { }