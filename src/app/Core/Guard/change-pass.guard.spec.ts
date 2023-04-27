import { TestBed } from '@angular/core/testing';

import { ChangePassGuard } from './change-pass.guard';

describe('ChangePassGuard', () => {
  let guard: ChangePassGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChangePassGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
