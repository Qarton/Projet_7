<template>
<div>
  <v-row justify="center">
    <v-col md="6" sm="10">
      <h1 class="text-center"> {{meme.title}} </h1>
        <v-img class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" />
        </v-col>
  </v-row>
  <v-row justify="center" class="align-center">
    <v-col md="8" class="d-flex align-center ml-4">
      <strong>Créateur :</strong>
      <pseudo :Utilisateur="testUserId" />
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="6" sm="10">
      <meme-comment />
    </v-col>
  </v-row>
</div>
</template>

<script>
import MemeService from '@/services/MemeService'
import MemeComment from '@/components/MemeComment'
import Pseudo from '@/components/Pseudo'
import { mapState } from 'vuex'
export default {
  components: {
    MemeComment,
    Pseudo
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      meme: {},
      testUserId: 1
    }
  },
  async created () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = ((await MemeService.show(memeId))).data
    this.testUserId = this.meme.UserId
  }
}
</script>

<style scoped>

</style>
