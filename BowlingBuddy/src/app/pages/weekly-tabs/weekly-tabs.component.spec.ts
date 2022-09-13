import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTabsComponent } from './weekly-tabs.component';

describe('WeeklyTabsComponent', () => {
  let component: WeeklyTabsComponent;
  let fixture: ComponentFixture<WeeklyTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyTabsComponent ]
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
