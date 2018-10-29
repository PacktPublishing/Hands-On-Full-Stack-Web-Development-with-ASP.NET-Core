<template>
  <div class="item-card">
    <div class="item-card-content-container">
        <img class="item-card-content-container-img" :src="primaryImageSrc" />
        <span class="item-card-content-container-title">{{product.title}}</span>
        <span class="item-card-content-container-text">{{product.description}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object,
  },
  computed: {
    primaryImageSrc: function() {
      return this.product && this.product.media && this.product.media.length > 0
        ? this.product.media[0].url
        : null;
    }
  },
}
</script>

<style scoped>
.item-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background-color: white;
  width: 280px;
  height: 200px;
  float: left;
  margin: 10;
}

.item-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.item-card-content-container {
  padding: 2px 16px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.item-card-content-container-img {
  display: block;
  max-width: 80px;
  max-height: 80px;
  width: auto;
  height: auto;
  text-align: center;
}

.item-card-content-container-title {
  display: block;
  font-size: 1.6rem;
}

.item-card-content-container-text {
  word-wrap: normal;
  font-size: 1.2rem;
  overflow: hidden;
}
</style>
