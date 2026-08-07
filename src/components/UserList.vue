<template>
  <div>
    <!-- Four distinct states, not one. This used to be v-if="!users.length", which
         renders "Loading..." for a request in flight, a request that failed, AND a
         successful request that returned nothing: three different situations a
         reader needs to tell apart, collapsed into one message that never goes
         away. -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">
      <p>Could not load users: {{ error }}</p>
      <p>
        This demo reads from
        <a href="https://github.com/alpersonalwebsite/node-express-postgresql">
          node-express-postgresql</a>. Start it locally, or point
        <code>VUE_APP_API_URL</code> at your own endpoint. See the README.
      </p>
      <button v-on:click="fetchUsers">Retry</button>
    </div>
    <div v-else-if="!users.length">No users returned.</div>
    <div v-else>
      <h2>List of Users: {{ users.length }}</h2>

      <UserWithEmit
        v-for="user in users"
        v-bind:user="user"
        v-bind:key="`emit${user.id}`"
        v-on:selectedUser="onClickUserInList"
      />
      <br />
      <UserWithCallback
        v-for="user in users"
        v-bind:user="user"
        v-bind:key="`callback${user.id}`"
        v-bind:onSelectUserCbF="onSelectUserCb"
      />
    </div>
    <div v-if="selectedUser">
      You selected: {{ selectedUser.firstname }} {{ selectedUser.lastname }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API, limitUserResults } from '../apiConfiguration'

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
      selectedUser: null,
      loading: false,
      error: null
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    // Returns the promise so a caller (or a test) can await it. Nothing is thrown:
    // the failure is put in `error` for the template to render, which is the point.
    // The previous version was a bare .then() with no .catch, so a failed request
    // left an unhandled rejection in the console and the UI in "Loading..." with no
    // way to tell that anything had gone wrong.
    fetchUsers() {
      this.loading = true
      this.error = null

      // params, not `${API}?limit=...`. If VUE_APP_API_URL already carries a query
      // string, template-literal concatenation produces a second '?' and the server
      // sees one malformed parameter. axios builds the URL properly: measured against
      // the pinned 0.19.2, a base of /api/users?tenant=demo becomes
      // /api/users?tenant=demo&limit=10 with params, and /api/users?tenant=demo?limit=10
      // by concatenation. It encodes values too, which concatenation does not.
      return axios
        .get(API, { params: { limit: limitUserResults } })
        .then(res => {
          this.users = this.readUsers(res.data)
        })
        .catch(err => {
          this.error = err.message
          this.users = []
        })
        .finally(() => {
          // Runs on both paths, so the spinner always clears whatever happened.
          this.loading = false
        })
    },

    // node-express-postgresql answers { "data": [ ... ] }. The dead Heroku endpoint
    // returned a bare array, and so do plenty of other APIs, so both are accepted:
    // this is a teaching repo and the first thing a reader does is point it somewhere
    // else. Anything unrecognised becomes an empty list rather than a render error.
    readUsers(body) {
      if (Array.isArray(body)) return body
      if (body && Array.isArray(body.data)) return body.data
      return []
    },

    onClickUserInList(user) {
      this.selectedUser = user
    },
    onSelectUserCb(user) {
      this.selectedUser = user
    }
  }
}
</script>

<style scoped>
.error {
  color: #b00020;
}
</style>
