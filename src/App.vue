<template>
  <div id="app">
    Hello {{users.length}}
  </div>
</template>

<script>
import axios from 'axios'
import { API, limitQuery, limitUserResults } from './apiConfiguration'

//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    
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
      console.log('Fetching users!')
      axios.get(`${API}?${limitQuery}${limitUserResults}`)
        .then(res => {
          console.log(res)
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
