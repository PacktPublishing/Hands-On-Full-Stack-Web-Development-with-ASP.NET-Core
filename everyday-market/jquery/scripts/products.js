'use-strict';

(function(window) {
    const ns = window.products = window.products || {};

    var productsContainer;

    function loadCategories(callback) {
        const menu = $('#menu');
        window.common.showBusyIndicator();

        window.api.getCategories(items => {
            items[0].className = 'menu-selected';
            menu.append(items.map(item => window.common.renderTemplate('menu-item', item)));
            
            window.common.hideBusyIndicator();

            callback();
        });
    }

    function syncProducts() {
        if (!productsContainer) {
            productsContainer = $('#productsContainer');
        }

        const category = $('#menu > li').filter('.menu-selected').attr('categoryName');
        
        productsContainer.empty();
        window.common.showBusyIndicator();

        window.api.getProducts(category,
            items => {
                productsContainer.append(items.map(item => window.common.renderTemplate('product-item', item)));
                window.common.hideBusyIndicator();
            });
    }

    ns.syncProducts = syncProducts;
    ns.loadCategories = loadCategories;
})(window);