<template>
  <div>
    <ul class="products-container">
      <li v-for="p in products" :key="p.productId">
        <ProductCard :product="p" />
      </li>
    </ul>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  props: {
    products: Array,
  },
}
</script>

<style scoped>
ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline;
}

.products-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
