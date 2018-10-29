<template>
  <div>
    <CategoryMenu
      :categories="categories"
      @category-changed="onCategoryChanged"
    />
    <ProductList :products="products" />
    <Busy v-if="busy" />
  </div>
</template>

<script>
import MarketService from '../../services/marketService';
import CategoryMenu from './CategoryMenu.vue';
import ProductList from './ProductList.vue';
import Busy from '../common/Busy.vue';

export default {
  name: 'ProductsPage',
  components: {
    CategoryMenu,
    ProductList,
    Busy,
  },
  data: () => ({
    categories: [],
    products: [],
    busy: false,
  }),
  async created() {
    this.busy = true;
    try {
      this.categories = await MarketService.loadCategories();
    } finally {
      this.busy = false;
    }
  },
  methods: {
    onCategoryChanged: async function(category) {
      this.busy = true;
      try {
        this.products = await MarketService.loadProducts(category.name);
      } finally {
        this.busy = false;
      }
    },
  },
}
</script>