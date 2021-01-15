<template>
<!-- Affichage du pseudo -->
<div @click="navigateTo({name: 'user', params: {userId: userId}})">
<v-card class="d-flex align-center mr-1" flat>
    <v-avatar rounded color="black" size="36">
      <v-icon class="white--text headline">mdi-account</v-icon>
    </v-avatar>
    <strong class="ml-1">{{owner}}</strong>
</v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      owner: null,
      userId: null
    }
  },
  props: ['Utilisateur'],
  async created () {
    this.owner = await this.Utilisateur.owner
    this.userId = await this.Utilisateur.UserId
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
