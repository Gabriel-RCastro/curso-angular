import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver() {
    // this._render.setStyle(this._elementRef.nativeElement, 'background-color', 'yellow');
    this.backgroundColor = 'yellow';

  }

  @HostListener('mouseleave') onMouseLeave() {
    // this._render.setStyle(this._elementRef.nativeElement, 'background-color', 'white');
    this.backgroundColor = 'white';
  }

  // @HostBinding('style.backgroundColor') backgroundColor: string;  // sem manipulação
  
  @HostBinding('style.backgroundColor') get setColor() { // com manipulação
    // é possível colocar código extra aqui caso necessário. 
    return this.backgroundColor;
  }
  private backgroundColor: string;

  constructor(
    // private _elementRef: ElementRef,
    // private _render: Renderer2
  ) { }

}
