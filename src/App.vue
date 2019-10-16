<template>
  <div id="app">
    <UserList v-bind:users="users" />
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
      users: []
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
    }
  },
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
