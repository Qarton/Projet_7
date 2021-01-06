<template>
  <v-row justify="center">
    <v-col md="4" sm="8">
      <meme-model :title="meme.title">
        <v-img  class="mx-2 my-2" :src='meme.imageUrl' alt="MEME" />
      </meme-model>
      <v-btn v-if="isUserLoggedIn && !comment" @click="addComment" class="cyan" dark>Comment</v-btn>
      <v-btn v-if="isUserLoggedIn && comment" @click="deleteComment" class="cyan" dark>Delete</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import MemeService from '@/services/MemeService'
import CommentService from '@/services/CommentService'
import MemeModel from '@/components/MemeModel'
import { mapState } from 'vuex'
export default {
  components: {
    MemeModel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      meme: {},
      comment: null
    }
  },
  async mounted () {
    const memeId = await this.$store.state.route.params.memeId
    this.meme = (await MemeService.show(memeId)).data
    if (!this.isUserLoggedIn) {
      return
    }
    this.comment = (await CommentService.index({
      memeId: this.meme.id,
      userId: this.$store.state.user.id
    })).data
    // P6 58:22 => todo try catch après séparation
  },
  methods: {
    async addComment () {
      try {
        this.comment = (await CommentService.post({
          memeId: this.meme.id,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async deleteComment () {
      try {
        await CommentService.delete(this.comment.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
