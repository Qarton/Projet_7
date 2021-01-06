<template>
  <div>
    <v-toolbar fixed class="cyan" dark>
      <v-toolbar-title class="mr-4">
          <v-btn text dark @click="navigateTo({name: 'Home'})">
            159GAG
        </v-btn>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="py-4">
        <v-btn v-if="isUserLoggedIn" text dark @click="navigateTo({name: 'meme-create'})">
            Add Meme
        </v-btn>
        <v-btn text dark @click="navigateTo({name: 'meme'})">
            Browse
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" text dark @click="navigateTo({name: 'login'})">
            Login
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" text dark @click="navigateTo({name: 'register'})">
            Sign up
        </v-btn>
        <v-btn v-if="isUserLoggedIn" text dark @click="logout">
            Log out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style scoped>
</style>
