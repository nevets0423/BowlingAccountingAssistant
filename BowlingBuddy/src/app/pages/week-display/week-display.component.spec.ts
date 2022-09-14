import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { DataManagerMock } from '../../test-helpers/data-manager-mock';

import { WeekDisplayComponent } from './week-display.component';

describe('WeekDisplayComponent', () => {
  let component: WeekDisplayComponent;
  let fixture: ComponentFixture<WeekDisplayComponent>;
  let mockDataManagerService: DataManagerMock;

  beforeEach(async () => {
    mockDataManagerService = new DataManagerMock();
    
    await TestBed.configureTestingModule({
      declarations: [ 
        WeekDisplayComponent 
      ],
      providers: [
        mockDataManagerService.Provider,
      ],
      imports: [
        MatInputModule,
        AgGridModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
