<template>
  <div>
    <Child @update="changeName" :greet="name" />
  </div>
</template>

<script>
import Child from './Child.vue';

export default {
  name: 'Parent',
  components: {
    Child,
  },
  computed: {
    name: function() {
      console.log(this.firstName); //eslint-disable-line
      return this.firstName + ' ' + this.lastName;
    }
  },
  data: () => ({
    firstName: 'John',
    lastName: 'Doe',
  }),
  methods: {
    changeName: function(newName) {
      this.firstName = newName;
    }
  },
}
</script>
