'use-strict';

(function(window) {
    function bootstrapApp() {
        window.products.loadCategories(setupAppMenu);
    }

    function setupAppMenu() {
        $('#menu').menu({items: "li"});
        $('#menu > li').click(e => {
            $('#menu > li').removeClass('menu-selected');
            $(e.currentTarget).toggleClass('menu-selected');

            window.products.syncProducts();
        });

        window.products.syncProducts();
    }

    $(bootstrapApp);
})(window);