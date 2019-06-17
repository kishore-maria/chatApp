import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { _AuthService } from './auth.service';

describe('_AuthService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
  );

  it('should be created', () => {
    const service: _AuthService = TestBed.get(_AuthService);
    expect(service).toBeTruthy();
  });
});
