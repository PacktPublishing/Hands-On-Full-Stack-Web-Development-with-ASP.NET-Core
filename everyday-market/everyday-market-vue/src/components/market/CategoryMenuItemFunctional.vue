<template functional>
  <div
    class="container"
    @click="evt => listeners.selected(props.categoryName, event)"
    :class="{selected: props.checked}"
  >
    <span>{{ props.categoryName }}</span>
  </div>
</template>

<script>
export default {
  name: 'CategoryMenuItem',
  props: { // optional
    categoryName: String,
    checked: Boolean,
  },
}
</script>

<style scoped>
.container {
  display: inline;
  padding: 5px 3px 5px 3px;
  border: 1px solid black;
  padding: 2px 5px 2px 5px;
  cursor: pointer;
}

.container:hover {
  background-color: lightgray;
}

.selected { 
  background-color: bisque;
}
</style>