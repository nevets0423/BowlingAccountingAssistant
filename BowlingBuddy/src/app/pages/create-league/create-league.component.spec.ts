import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataManagerMock } from '../../test-helpers/data-manager-mock';

import { CreateLeagueComponent } from './create-league.component';

describe('CreateLeagueComponent', () => {
  let component: CreateLeagueComponent;
  let fixture: ComponentFixture<CreateLeagueComponent>;
  let mockDataManagerService: DataManagerMock;

  beforeEach(async () => {
    mockDataManagerService = new DataManagerMock();
    
    await TestBed.configureTestingModule({
      declarations: [ 
        CreateLeagueComponent 
      ],
      providers: [
        mockDataManagerService.Provider,
        FormBuilder,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
