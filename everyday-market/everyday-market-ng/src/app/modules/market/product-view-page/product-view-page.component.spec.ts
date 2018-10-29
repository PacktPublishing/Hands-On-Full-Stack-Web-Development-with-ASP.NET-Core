import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewPageComponent } from './product-view-page.component';

describe('ProductViewPageComponent', () => {
  let component: ProductViewPageComponent;
  let fixture: ComponentFixture<ProductViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
