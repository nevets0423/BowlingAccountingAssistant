import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRoutingPageComponent } from './main-routing-page.component';

describe('MainRoutingPageComponent', () => {
  let component: MainRoutingPageComponent;
  let fixture: ComponentFixture<MainRoutingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRoutingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRoutingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
