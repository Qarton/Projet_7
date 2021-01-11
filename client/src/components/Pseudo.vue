<template>
<div @click="navigateTo({name: 'activity', params: {userId: userId}})">
<v-card class="d-flex align-center mr-1" flat>
    <v-avatar rounded color="black" size="36">
      <span class="white--text headline">{{userId}}</span>
    </v-avatar>
    <strong class="ml-1">{{userEmail}}</strong>
</v-card>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      userId: null,
      userEmail: null
    }
  },
  props: ['Utilisateur'],
  async created () {
    this.userId = await this.Utilisateur
    this.userEmail = (await AuthenticationService.index({ userId: this.userId })).data
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
