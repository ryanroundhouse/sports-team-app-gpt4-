import { TestBed } from '@angular/core/testing';

import { TeamMembershipService } from './team-membership.service';

describe('TeamMembershipService', () => {
  let service: TeamMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
