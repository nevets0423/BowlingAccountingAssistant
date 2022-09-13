import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericArrayInputCellRendererComponent } from './numeric-array-input-cell-renderer.component';

describe('NumericArrayInputCellRendererComponent', () => {
  let component: NumericArrayInputCellRendererComponent;
  let fixture: ComponentFixture<NumericArrayInputCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericArrayInputCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericArrayInputCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
