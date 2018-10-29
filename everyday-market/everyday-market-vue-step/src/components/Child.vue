<template>
  <div>
    <span>Hello {{ greet }}</span>
    <button @click="changeNameClicked">Change Name</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    greet: String,
  },
  methods: {
    changeNameClicked: function() {
      this.$emit('update', 'Jane Doe');
    }
  },
}
</script>