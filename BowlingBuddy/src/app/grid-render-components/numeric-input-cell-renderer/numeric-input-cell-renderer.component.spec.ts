import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericInputCellRendererComponent } from './numeric-input-cell-renderer.component';

describe('NumericInputCellRendererComponent', () => {
  let component: NumericInputCellRendererComponent;
  let fixture: ComponentFixture<NumericInputCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericInputCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericInputCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
