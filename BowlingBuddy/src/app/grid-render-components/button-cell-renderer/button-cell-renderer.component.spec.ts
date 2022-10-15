import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCellRendereComponent as ButtonCellRendererComponent } from './button-cell-renderer.component';

describe('ButtonCellRendereComponent', () => {
  let component: ButtonCellRendererComponent;
  let fixture: ComponentFixture<ButtonCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
