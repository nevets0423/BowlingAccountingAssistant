import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDisplayComponent } from './week-display.component';

describe('WeekDisplayComponent', () => {
  let component: WeekDisplayComponent;
  let fixture: ComponentFixture<WeekDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekDisplayComponent ]
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
