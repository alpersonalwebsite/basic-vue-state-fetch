<template>
  <div v-on:click="onClickUser">
    <span>{{user.name + ' ' + user.lastname}}</span>
  </div>
</template>

<script>
export default {
  name: 'UserWithEmit',
  props: {
    user: Object
  },
  methods: {
    onClickUser() {
      this.$emit('selectedUser', this.user)
      const current = new Date()
      // eslint-disable-next-line no-console
      console.log('Emiting from User', current.toLocaleTimeString(), current.getMilliseconds())
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