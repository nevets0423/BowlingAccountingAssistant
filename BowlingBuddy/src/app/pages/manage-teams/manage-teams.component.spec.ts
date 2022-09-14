import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { DataManagerMock } from '../../test-helpers/data-manager-mock';

import { ManageTeamsComponent } from './manage-teams.component';

describe('ManageTeamsComponent', () => {
  let component: ManageTeamsComponent;
  let fixture: ComponentFixture<ManageTeamsComponent>;
  let mockDataManager = new DataManagerMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ManageTeamsComponent 
      ],
      imports:[
        MatInputModule,
        AgGridModule
      ],
      providers:[
        mockDataManager.Provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
