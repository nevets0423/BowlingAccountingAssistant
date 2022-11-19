import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataManagerMock } from '../../test-helpers/data-manager-mock';

import { HeaderComponent } from './header.component';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockDataManagerService: DataManagerMock;

  beforeEach(async () => {
    mockDataManagerService = new DataManagerMock();

    await TestBed.configureTestingModule({
      declarations: [ 
        HeaderComponent 
      ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        BrowserAnimationsModule,
      ],
      providers:[
        mockDataManagerService.Provider
      ]
    } as TestModuleMetadata)
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
