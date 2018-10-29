import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyComponent } from './busy.component';

describe('BusyComponent', () => {
  let component: BusyComponent;
  let fixture: ComponentFixture<BusyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
