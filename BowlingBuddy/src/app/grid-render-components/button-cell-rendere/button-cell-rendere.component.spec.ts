import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCellRendereComponent } from './button-cell-rendere.component';

describe('ButtonCellRendereComponent', () => {
  let component: ButtonCellRendereComponent;
  let fixture: ComponentFixture<ButtonCellRendereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCellRendereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCellRendereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
