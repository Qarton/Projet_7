<template>
  <v-row justify="center">
    <v-col md="4" sm="8">
      <meme-model :title="meme.title">
        <v-img  class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" />
      </meme-model>
      <pseudo :Utilisateur="testUserId" />
      <meme-comment />
    </v-col>
  </v-row>
</template>

<script>
import MemeService from '@/services/MemeService'
import MemeModel from '@/components/MemeModel'
import MemeComment from '@/components/MemeComment'
import Pseudo from '@/components/Pseudo'
import { mapState } from 'vuex'
export default {
  components: {
    MemeModel,
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
