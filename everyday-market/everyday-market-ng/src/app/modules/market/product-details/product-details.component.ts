import { Component, Input } from '@angular/core';
import { Product } from '../../../model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product: Product;

  get primaryImageSrc() {
    return this.product && this.product.media && this.product.media.length > 0
      ? this.product.media[0].url
      : null;
  }
}
