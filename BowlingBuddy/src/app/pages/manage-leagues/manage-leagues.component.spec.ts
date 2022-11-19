import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataManagerMock } from 'src/app/test-helpers/data-manager-mock';

import { ManageLeaguesComponent } from './manage-leagues.component';

describe('ManageLeaguesComponent', () => {
  let component: ManageLeaguesComponent;
  let fixture: ComponentFixture<ManageLeaguesComponent>;
  let mockDataManagerService: DataManagerMock;

  beforeEach(async () => {
    mockDataManagerService = new DataManagerMock();

    mockDataManagerService.DataManagerMockService.GetLeagueOverviews.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ ManageLeaguesComponent ],
      providers:[
        mockDataManagerService.Provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
