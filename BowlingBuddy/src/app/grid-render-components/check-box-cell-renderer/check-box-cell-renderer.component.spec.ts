import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxCellRendererComponent } from './check-box-cell-renderer.component';

describe('CheckBoxCellRendererComponent', () => {
  let component: CheckBoxCellRendererComponent;
  let fixture: ComponentFixture<CheckBoxCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBoxCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBoxCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
