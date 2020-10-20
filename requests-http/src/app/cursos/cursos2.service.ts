import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud-service';
import { Curso } from './models/icurso';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
