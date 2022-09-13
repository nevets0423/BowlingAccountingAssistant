import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputCellRendererComponent } from './generic-input-cell-renderer.component';

describe('GenericInputCellRendererComponent', () => {
  let component: GenericInputCellRendererComponent;
  let fixture: ComponentFixture<GenericInputCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericInputCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericInputCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
