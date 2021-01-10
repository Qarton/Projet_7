<template>
  <div @click="navigateTo({name: 'activity', params: {userId: userId}})">
    Utilisateur : {{userEmail}}
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
