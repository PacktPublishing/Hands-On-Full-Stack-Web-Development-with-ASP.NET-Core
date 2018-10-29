<template>
  <ul>
    <li v-for="c in categories" :key="c.name">
      <CategoryMenuItem 
        :categoryName="c.name"
        :checked="c.name === selectedCategoryName"
        @selected="onCategorySelected"
      >
      </CategoryMenuItem >
    </li>
  </ul>
</template>

<script>
import CategoryMenuItem from './CategoryMenuItemFunctional.vue';

export default {
  name: 'CategoryMenu',
  components: {
    CategoryMenuItem,
  },
  props: {
    categories: Array,
  },
  data: () => ({
    selectedCategoryName: String,
  }),
  methods: {
    onCategorySelected: function(categoryName) {
      const cat = this.categories.find(c => c.name === categoryName);
      this.selectedCategoryName = cat.name;
      this.$emit('category-changed', cat);
    },
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
</style>