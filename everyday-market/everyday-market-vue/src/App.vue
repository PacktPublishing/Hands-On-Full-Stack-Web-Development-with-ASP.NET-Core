<template>
  <div>
    <Header />
    <div class="main-area">
      <ProductsPage />
    </div>
  </div>
</template>

<script>
import Header from './components/common/Header.vue';
import ProductsPage from './components/market/ProductsPage.vue';

export default {
  name: 'app',
  components: {
    Header,
    ProductsPage,
  }
}
</script>

<style>
.main-area {
  margin: 10px;
}
</style>
