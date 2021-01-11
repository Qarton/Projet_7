<template>
<div>
  <v-row justify="center">
    <v-col lg ="4" md="6" sm="10">
      <p class="text-capitalize text-h5 font-weight-bold mb-0"> {{meme.title}} </p>
        <v-img class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" />
        </v-col>
  </v-row>
  <v-row justify="center" class="align-center">
    <v-col md="8" class="d-flex align-center ml-4">
      <strong>Créateur :</strong>
      <pseudo :Utilisateur="testUserId" />
      Crée le {{ moment(meme.createdAt).format("DD/MM/YYYY") }} à {{ moment(meme.createdAt).format("HH:MM") }}
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <v-row class="mt-4" justify="center">
    <v-col md="6" sm="10">
      <meme-comment />
    </v-col>
  </v-row>
</div>
</template>

<script>
import moment from 'moment'
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
      testUserId: 1,
      moment: moment
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
