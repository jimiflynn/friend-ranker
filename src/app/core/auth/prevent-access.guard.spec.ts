import { TestBed, async, inject } from '@angular/core/testing';

import { PreventAccessGuard } from './prevent-access.guard';

describe('PreventAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventAccessGuard]
    });
  });

  it('should ...', inject([PreventAccessGuard], (guard: PreventAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
