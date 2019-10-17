<template>
  <div id="app">
    <UserList v-bind:users="users"
      v-on:clickUserInList="onClickUserInApp" />

    <div v-if="selectedUser">
      Selected User: {{ selectedUser }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API, limitQuery, limitUserResults } from './apiConfiguration'

import UserList from './components/UserList.vue'

export default {
  name: 'App',
  components: {
    UserList
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
    onClickUserInApp(user) {
      this.selectedUser = user
      console.log('App')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
