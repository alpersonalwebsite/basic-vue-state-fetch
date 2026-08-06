<template>
  <div v-on:click="onClickUser">
    <span>{{ user.firstname }} {{ user.lastname }}</span>
  </div>
</template>

<script>
export default {
  name: 'UserWithEmit',
  props: {
    // Was `user: Object`, which says "an object" and nothing else. required means a
    // missing prop is a console warning during development rather than a blank row.
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    // The emit half of the demo: the child announces what happened and the parent
    // decides what it means. The parent listens with v-on:selectedUser.
    onClickUser() {
      this.$emit('selectedUser', this.user)
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
