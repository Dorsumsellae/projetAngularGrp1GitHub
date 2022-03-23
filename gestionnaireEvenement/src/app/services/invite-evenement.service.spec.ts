import { TestBed } from '@angular/core/testing';

import { InviteEvenementService } from './invite-evenement.service';

describe('InviteEvenementService', () => {
  let service: InviteEvenementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviteEvenementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
