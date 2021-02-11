<template>
<!-- Affichage du pseudo -->
<div v-if="this.user!=null" @click="navigateTo({name: 'history', params: {userId: userId}})">
<v-card class="d-flex align-center mr-1" flat>
    <v-avatar rounded color="black" size="36">
      <v-icon class="white--text headline">mdi-account</v-icon>
    </v-avatar>
    <strong class="ml-1">{{user.firstName}} {{user.name}}</strong>
</v-card>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      user: null,
      userId: null
    }
  },
  props: ['Utilisateur'],
  async created () {
    this.userId = await this.Utilisateur.UserId
    this.user = (await AuthenticationService.pseudo(this.userId)).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>

</style>
