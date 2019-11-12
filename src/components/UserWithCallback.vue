<template>
  <div v-on:click="onSelectUserCbF(user)">
    <span>{{user.name + ' ' + user.lastname}}</span>
  </div>
</template>

<script>
export default {
  name: 'UserWithCallback',
  props: {
    user: Object,
    onSelectUserCbF: Function
  }
}
</script>

<style scoped>
  span {
    cursor: pointer;
    width: auto;
  }
</style>