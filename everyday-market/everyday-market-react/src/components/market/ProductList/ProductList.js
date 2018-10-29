import React from 'react';
import './ProductList.css';
import {ProductCard} from '../';

const ProductList = ({products}) => (
  <div>
    <ul id="products-container">
      {products.map(p => (
        <li key={p.productId}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
