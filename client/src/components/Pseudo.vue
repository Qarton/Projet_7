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
    console.log(this.userId, 'test ID')
    this.userEmail = (await AuthenticationService.index({ userId: this.userId })).data
    console.log(this.userEmail)
  }
}
</script>

<style scoped>

</style>
