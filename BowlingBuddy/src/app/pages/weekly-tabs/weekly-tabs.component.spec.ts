import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataManagerMock } from '../../test-helpers/data-manager-mock';
import { WeekDisplayComponent } from '../week-display/week-display.component';

import { WeeklyTabsComponent } from './weekly-tabs.component';

describe('WeeklyTabsComponent', () => {
  let component: WeeklyTabsComponent;
  let fixture: ComponentFixture<WeeklyTabsComponent>;
  let mockDataManagerService: DataManagerMock; 

  beforeEach(async () => {
    mockDataManagerService = new DataManagerMock();

    await TestBed.configureTestingModule({
      declarations: [ 
        WeeklyTabsComponent,
        WeekDisplayComponent
      ],
      providers: [
        mockDataManagerService.Provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
