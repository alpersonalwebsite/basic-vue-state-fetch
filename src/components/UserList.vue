<template>
  <div>
    <h2>List of Users: {{users.length}}</h2>
    <User
      v-for="user in users"
      v-bind:user="user"
      v-bind:key="user.user_id"
     />
  </div> 
</template>

<script>
import User from './User'

export default {
  name: 'UserList',
  components: {
    User
  },
  props: {
    users: Array
  }
}
</script>

<style scoped>

</style>