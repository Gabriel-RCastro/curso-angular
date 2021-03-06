import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivaNgIfComponent } from './diretiva-ngif.component';

describe('DiretivaNgIfComponent', () => {
  let component: DiretivaNgIfComponent;
  let fixture: ComponentFixture<DiretivaNgIfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretivaNgIfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivaNgIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
