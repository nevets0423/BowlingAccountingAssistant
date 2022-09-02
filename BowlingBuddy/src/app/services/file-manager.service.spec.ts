import { TestBed } from '@angular/core/testing';
import { ElectronService } from 'ngx-electron';

import { FileManagerService } from './file-manager.service';

describe('FileManagerService', () => {
  let service: FileManagerService;
  let _icpRenderer = jasmine.createSpyObj('ElectronService', ['send']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{
        provide: ElectronService,
        useValue: _icpRenderer
      }]
    });
    service = TestBed.inject(FileManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
