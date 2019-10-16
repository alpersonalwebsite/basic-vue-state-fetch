<template>
  <div>
    {{user.name + ' ' + user.lastname}}
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: Object
  }
}
</script>

<style scoped>

</style>