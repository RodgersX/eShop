<template>
  <v-app>
    <v-app-bar
      app
      color=""
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/" class="row">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-layout justify-end>
         <div v-if="isLoggedIn">
           <span class="email black-text"> {{ user.email }}</span>
           <v-btn v-on:click="Logout"  color="success">Logout</v-btn>
         </div>
        <span v-else>
           <v-btn to="/login"  color="success">Sign in</v-btn>
         </span>
      </v-layout>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    user () {
      const getItems = this.$cookies.get('user')
      return getItems
    }
  },
  methods: {
  /**
   * @vuese
   * This method is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="blank"> Promise</a> base and used to logout the user. The store dispatches the logout action
   * @arg Please refer to action.js
   */
    Logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
          this.errors = []
        })
        .catch(err => {
          this.errors.push(err)
        })
    }
  }
}
</script>

<style scoped>
.email {
  padding-right: 10px;
}
