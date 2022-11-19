import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { MigrationManagerService } from 'src/app/services/migration-manager.service';
import { DataManagerMock } from 'src/app/test-helpers/data-manager-mock';

import { WelcomeScreenComponent } from './welcome-screen.component';

describe('WelcomeScreenComponent', () => {
  let component: WelcomeScreenComponent;
  let fixture: ComponentFixture<WelcomeScreenComponent>;
  let _migrationManager: jasmine.SpyObj<MigrationManagerService>;
  let _dataManager: DataManagerMock;

  beforeEach(async () => {
    _migrationManager = jasmine.createSpyObj('MigrationManagerService', ['MigrateData']);
    _migrationManager.MigrateData.and.returnValue();
    (_migrationManager as any).Migrating = new BehaviorSubject<any>(null);
    _dataManager = new DataManagerMock();

    await TestBed.configureTestingModule({
      declarations: [ WelcomeScreenComponent ],
      providers: [
        {provide: MigrationManagerService, useValue: _migrationManager},
        _dataManager.Provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
