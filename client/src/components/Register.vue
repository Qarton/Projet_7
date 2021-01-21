<template>
<!-- panneau d'enregistrement d'un utilisateur -->
      <v-row justify="center">
        <v-col lg="4" md="6" sm="8">
          <panel title="Inscription">
            <v-text-field
              v-model="name"
              label="Nom"
              @keyup.enter="register"
            ></v-text-field>
            <v-text-field
              v-model="firstName"
              label="Prénom"
              @keyup.enter="register"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              @keyup.enter="register"
            ></v-text-field>
            <v-text-field
              v-model="password"
              @keyup.enter="register"
              type="password"
              label="Mot de passe"
            ></v-text-field>
            <v-alert dense type="error" v-if="error" v-html="error" />
            <v-btn @click="register" class="black" dark>Enregistrer</v-btn>
          </panel>
        </v-col>
      </v-row>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      email: '',
      password: '',
      name: '',
      firstName: '',
      error: null,
      success: null
    }
  },
  components: {
    Panel
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          name: this.name,
          firstName: this.firstName
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'meme'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
