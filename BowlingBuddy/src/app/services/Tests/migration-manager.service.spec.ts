import { TestBed } from '@angular/core/testing';

import { MigrationManagerService } from '../migration-manager.service';

describe('MigrationManagerService', () => {
  let service: MigrationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MigrationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
