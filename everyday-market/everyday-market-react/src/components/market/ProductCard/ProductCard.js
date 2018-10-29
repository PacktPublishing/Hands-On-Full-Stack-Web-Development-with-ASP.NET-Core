import React from 'react';
import './ProductCard.css';

function primaryImageSrc(product) {
  return product && product.media && product.media.length > 0
    ? product.media[0].url
    : null;
}

const ProductCard = ({product}) => (
  <div className="item-card">
    <div className="item-card-content-container">
        <img className="item-card-content-container-img" alt="product"
             src={primaryImageSrc(product)} />
        <span className="item-card-content-container-title">{product.title}</span>
        <span className="item-card-content-container-text">{product.description}</span>
    </div>
  </div>
);

export default ProductCard;
