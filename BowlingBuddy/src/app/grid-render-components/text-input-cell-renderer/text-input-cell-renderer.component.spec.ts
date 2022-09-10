import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputCellRendererComponent } from './text-input-cell-renderer.component';

describe('TextInputCellRendererComponent', () => {
  let component: TextInputCellRendererComponent;
  let fixture: ComponentFixture<TextInputCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
