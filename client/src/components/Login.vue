<template>
      <v-row justify="center">
        <v-col md="4" sm="8">
          <panel title="Login">
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field v-model="password" type="password" label="Password"></v-text-field>
            <div class="error" v-html="error" />
            <div class="success" v-html="success" />
            <v-btn @click="login" class="cyan" dark>Login</v-btn>
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
      error: null,
      success: null
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
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: white;
}
.success {
  color: white;
}
</style>
