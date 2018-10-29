import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category, NewProduct } from '../../../model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Output() productSubmit = new EventEmitter<NewProduct>();
  @Input() categories: Category[];

  product: NewProduct = {
    title: '',
    description: '',
    category: '',
  };

  onSubmit(ok) {
    this.productSubmit.emit(ok ? this.product : null);
  }
}
