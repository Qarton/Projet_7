<template>
<!-- Header de la page avec boutons pour se connecter et s'enregistrer -->
  <div>
    <v-toolbar fixed class="black" dark>
      <v-toolbar-title class="mr-4">
        <v-img max-width="250" contain :src="require('../assets/icon-left-font-monochrome-white.svg')" alt="logo" @click="navigateTo({name: 'meme'})" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="py-4">
        <v-btn v-if="isUserLoggedIn" class="primary rounded d-none d-md-block" text dark @click="navigateTo({name: 'meme-create'})">
          <v-icon class="pr-1">mdi-plus</v-icon>
          Ajouter un Meme
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" class="d-none d-md-block" text dark @click="navigateTo({name: 'login'})">
          Connexion
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" class="primary rounded d-none d-md-block" text dark @click="navigateTo({name: 'register'})">
          Inscription
        </v-btn>
        <v-btn v-if="isUserLoggedIn" class="d-none d-md-block" text dark @click="navigateTo({name: 'user', params: {userId: user.id}})">
          Mon Historique
        </v-btn>
        <v-btn v-if="isUserLoggedIn" class="d-none d-md-block" text dark @click="logout">
          Déconnexion
        </v-btn>
        <v-app-bar-nav-icon class="d-md-none" @click="drawer = true">
      </v-app-bar-nav-icon>
      </v-toolbar-items>
    </v-toolbar>
      <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      class="grey darken-3"
      dark
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item v-if="isUserLoggedIn" @click="navigateTo({name: 'meme-create'})">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ajouter un Meme</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isUserLoggedIn" @click="navigateTo({name: 'user', params: {userId: user.id}})">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mon Historique</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isUserLoggedIn" @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!isUserLoggedIn" @click="navigateTo({name: 'login'})">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Connexion</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!isUserLoggedIn" @click="navigateTo({name: 'register'})">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inscription</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
  data () {
    return {
      drawer: false
    }
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
