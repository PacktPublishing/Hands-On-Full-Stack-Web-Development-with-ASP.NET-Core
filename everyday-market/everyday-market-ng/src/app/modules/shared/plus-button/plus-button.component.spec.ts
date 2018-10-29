import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusButtonComponent } from './plus-button.component';

describe('PlusButtonComponent', () => {
  let component: PlusButtonComponent;
  let fixture: ComponentFixture<PlusButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlusButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
