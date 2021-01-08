<template>
  <div>
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
  }
}
</script>

<style scoped>

</style>
