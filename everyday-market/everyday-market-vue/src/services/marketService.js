const baseUrl = 'http://localhost:55564/api/';

function loadCategories() {
  return fetch(`${baseUrl}products/categories`)
    .then(r => r.json());
}

function loadProducts(categoryName) {
  return fetch(`${baseUrl}products/searchcategory/${categoryName}`)
    .then(r => r.json());
}

export default {
  loadCategories,
  loadProducts,
};
