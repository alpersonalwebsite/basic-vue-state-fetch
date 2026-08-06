<template>
  <div v-on:click="onSelectUserCbF(user)">
    <span>{{ user.firstname }} {{ user.lastname }}</span>
  </div>
</template>

<script>
export default {
  name: 'UserWithCallback',
  props: {
    user: {
      type: Object,
      required: true
    },
    // The callback half of the demo: the parent hands a function down and the child
    // calls it. Same result as the emit above, and worth comparing: this one couples
    // the child to a specific caller's function, while an event does not care who
    // listens or whether anybody does.
    onSelectUserCbF: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
  span {
    cursor: pointer;
    width: auto;
  }
</style>
