<template>
<!-- Affichage du pseudo -->
  <div v-if="this.userData!=null" @click="navigateTo({name: 'history', params: {userId: userData.UserId}})">
    <v-row align="center">
      <v-card class="d-flex align-center mr-1" flat>
        <v-avatar rounded color="black" size="36">
          <v-icon class="white--text headline">mdi-account</v-icon>
        </v-avatar>
        <strong class="ml-1">{{userData.User.firstName}} {{userData.User.name}}</strong>
      </v-card>
    le {{ moment(userData.createdAt).format("DD/MM/YYYY") }} à {{ moment(userData.createdAt).format("HH:mm") }}
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      userData: null,
      moment: moment
    }
  },
  props: ['data'],
  async created () {
    this.userData = await this.data
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
