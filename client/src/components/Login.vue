<template>
<!-- panneau de Login -->
  <v-row justify="center">
    <v-col lg="4" md="6" sm="8">
      <panel title="Connexion">
        <v-text-field
        v-model="email"
        label="Email"
        @keyup.enter="$event.target.nextElementSibling.focus()"
        ></v-text-field>
        <v-text-field
        v-model="password"
        type="password"
        label="Password"
        @keyup.enter="login"
        ></v-text-field>
        <v-alert dense dark color="#2A3B4D" v-if="error" v-html="error" />
        <v-btn @click="login" class="black" dark>Connexion</v-btn>
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
      error: null
    }
  },
  components: {
    Panel
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
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
