<template>
  <div @click="navigateTo({name: 'user-activity', params: {userId: userId}})">
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
  async mounted () {
    this.userId = this.Utilisateur
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
