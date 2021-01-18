<template>
<!-- Header de la page avec boutons pour se connecter et s'enregistrer -->
  <div>
    <v-toolbar fixed class="black" dark>
      <v-toolbar-items class="py-4">
        <v-img max-width="250" contain :src="require('../assets/icon-left-font-monochrome-white.svg')" alt="logo" @click="navigateTo({name: 'meme'})" />
        <v-spacer></v-spacer>
        <v-btn v-if="isUserLoggedIn" class="primary rounded" text dark @click="navigateTo({name: 'meme-create'})">
          <v-icon class="pr-1">mdi-plus</v-icon>
            Add Meme
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" text dark @click="navigateTo({name: 'login'})">
            Login
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" class="primary rounded" text dark @click="navigateTo({name: 'register'})">
            Sign up
        </v-btn>
        <v-btn v-if="isUserLoggedIn" text dark @click="navigateTo({name: 'user', params: {userId: user.id}})">
          Activity
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
      'isUserLoggedIn',
      'user'
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
        name: 'meme'
      })
    }
  }
}
</script>

<style scoped>
</style>
