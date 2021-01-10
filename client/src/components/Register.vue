<template>
      <v-row justify="center">
        <v-col md="4" sm="8">
          <panel title="Register">
            <v-text-field
            v-model="email"
            label="Email"
            @keyup.enter="register"
            ></v-text-field>
            <v-text-field
            v-model="password"
            @keyup.enter="register"
            type="password"
            label="Password"
            ></v-text-field>
            <v-alert dense type="error" v-if="error" v-html="error" />
            <v-btn @click="register" class="cyan" dark>Register</v-btn>
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
    async register () {
      try {
        const response = await AuthenticationService.register({
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
.error {
  color: white;
}
</style>
