import { TestBed } from '@angular/core/testing';

import { FirstGuardGuard } from './first-guard.guard';

describe('FirstGuardGuard', () => {
  let guard: FirstGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
