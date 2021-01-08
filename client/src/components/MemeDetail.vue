<template>
  <v-row justify="center">
    <v-col md="4" sm="8">
      <meme-model :title="meme.title">
        <v-img  class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" />
        Créateur : {{userEmail}}
      </meme-model>
      <meme-comment />
    </v-col>
  </v-row>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import MemeService from '@/services/MemeService'
import MemeModel from '@/components/MemeModel'
import MemeComment from '@/components/MemeComment'
import { mapState } from 'vuex'
export default {
  components: {
    MemeModel,
    MemeComment
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      meme: {},
      userId: null,
      userEmail: null
    }
  },
  async mounted () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = (await MemeService.show(memeId)).data
    this.userId = await this.meme.UserId
    this.userEmail = (await AuthenticationService.index({ userId: this.userId })).data
  }
}
</script>

<style scoped>

</style>
