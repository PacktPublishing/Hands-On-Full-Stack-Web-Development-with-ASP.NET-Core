'use-strict';

(function (window) {
  const ns = window.api = window.api || {};

  // EDIT the URL with the the address of your REST API
  const baseUrl = 'http://localhost:55564/api/';

  function getApiAction(action, ...parameters) {
    const p = (!parameters || parameters.length === 0) ? '' : `/${Object.values(parameters).join('/')}`;
    return `${baseUrl}/${action}${p}`;
  }

  function visitProducts(products, callback) {
    products.forEach(p => {
      if (p.media && p.media.length > 0) {
        p.primaryImage = p.media[0].url;
      }
    });

    if (callback) callback(products);
  }

  ns.getProducts = function (category, callback) {
    return $.getJSON(getApiAction('products/searchcategory', category),
      data => visitProducts(data, callback));
  }

  ns.getCategories = function (callback) {
    return $.getJSON(getApiAction('products/categories'), callback);
  }
})(window);