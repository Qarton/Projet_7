<template>
<!-- Header de la page avec boutons pour se connecter et s'enregistrer -->
  <div>
    <v-toolbar fixed class="black" dark>
      <v-toolbar-title class="mr-4">
        <v-img max-width="250" contain :src="require('../assets/icon-left-font-monochrome-white.svg')" alt="logo" @click="navigateTo({name: 'meme'})" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="py-4">
        <v-btn v-if="isUserLoggedIn" class="primary rounded" text dark @click="navigateTo({name: 'meme-create'})">
          <v-icon class="pr-1">mdi-plus</v-icon>
          Ajouter un Meme
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" text dark @click="navigateTo({name: 'login'})">
          Connexion
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" class="primary rounded" text dark @click="navigateTo({name: 'register'})">
          Inscription
        </v-btn>
        <v-btn v-if="isUserLoggedIn" text dark @click="navigateTo({name: 'user', params: {userId: user.id}})">
          Mon Historique
        </v-btn>
        <v-btn v-if="isUserLoggedIn" text dark @click="logout">
          Déconnexion
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
