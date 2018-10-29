import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../../model';

@Component({
  selector: 'app-product-view-page',
  templateUrl: './product-view-page.component.html',
  styleUrls: ['./product-view-page.component.css']
})
export class ProductViewPageComponent implements OnInit {
  product: Product;
  isBusy = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
    ) { }

  ngOnInit() {
    // should generally use the observer and subscribe.
    const productId = +this.route.snapshot.paramMap.get('id');

    this.isBusy = true;
    try {
      this.productsService.loadProduct(productId)
        .then(p => this.product = p);
    } finally {
      this.isBusy = false;
    }
  }
}
