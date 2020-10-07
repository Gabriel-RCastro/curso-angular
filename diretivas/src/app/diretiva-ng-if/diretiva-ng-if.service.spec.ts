import { TestBed } from '@angular/core/testing';

import { DiretivaNgIfService } from './diretiva-ng-if.service';

describe('DiretivaNgIfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiretivaNgIfService = TestBed.get(DiretivaNgIfService);
    expect(service).toBeTruthy();
  });
});
