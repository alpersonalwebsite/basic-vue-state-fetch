<template>
  <div>
    <div v-if="!users.length">Loading...</div>
    <div v-else>
      <h2>List of Users: {{users.length}}</h2>

      <UserWithEmit
        v-for="user in users"
        v-bind:user="user"
        v-bind:key="`emit${user.user_id}`"
        v-on:selectedUser="onClickUserInList"
      />
      <br />
      <UserWithCallback
        v-for="user in users"
        v-bind:user="user"
        v-bind:key="`callback${user.user_id}`"
        v-bind:onSelectUserCbF="onSelectUserCb"
      />

    </div>
     <div v-if="selectedUser">
       You selected: {{ selectedUser }}
     </div>
  </div> 
</template>

<script>
import axios from 'axios'
import { API, limitQuery, limitUserResults } from '../apiConfiguration'

import UserWithEmit from './UserWithEmit.vue'
import UserWithCallback from './UserWithCallback.vue'

export default {
  name: 'UserList',
  components: {
    UserWithEmit,
    UserWithCallback
  },
  data() {
    return {
      users: [],
      selectedUser: null
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      //console.log('Fetching users!')
      axios.get(`${API}?${limitQuery}${limitUserResults}`)
        .then(res => {
          //console.log(res)
          this.users = res.data
        })
    },
    onClickUserInList(user) {
      this.selectedUser = user
      // eslint-disable-next-line no-console
      console.log('List')
    },
    onSelectUserCb(user) {
      this.selectedUser = user
      // eslint-disable-next-line no-console
      console.log('List callback')
    }
  }
}
</script>

<style scoped>
</style>