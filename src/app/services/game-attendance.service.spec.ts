import { TestBed } from '@angular/core/testing';

import { GameAttendanceService } from './game-attendance.service';

describe('GameAttendanceService', () => {
  let service: GameAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
